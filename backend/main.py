import re
import logging

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from backend.database import get_db

logger = logging.getLogger("optisql")

app = FastAPI(title="OptiSQL Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "running"}


class QueryRequest(BaseModel):
    query: str


DROP_DATABASE_OR_SCHEMA_PATTERN = re.compile(r"\bdrop\s+(database|schema)\b", re.IGNORECASE)
DROP_TABLE_PATTERN = re.compile(r"\bdrop\s+table\b", re.IGNORECASE)


@app.post("/execute-query")
def execute_query(payload: QueryRequest, db: Session = Depends(get_db)) -> dict:
    raw_query = payload.query
    sql_query = (raw_query or "").strip()
    if not sql_query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    # Single statement restriction: allow at most one trailing semicolon.
    normalized = sql_query.strip()
    semicolon_count = normalized.count(";")
    if semicolon_count > 1:
        raise HTTPException(status_code=400, detail="Only one query can be executed at a time.")
    if semicolon_count == 1 and not normalized.rstrip().endswith(";"):
        raise HTTPException(status_code=400, detail="Only one query can be executed at a time.")
    if normalized.endswith(";"):
        normalized = normalized[:-1].rstrip()

    # Validate the starting keyword (allowlist).
    parts = normalized.split()
    if not parts:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    first_word = parts[0].upper()
    allowed_commands = ["SELECT", "INSERT", "UPDATE", "DELETE", "CREATE", "ALTER"]
    if first_word not in allowed_commands:
        raise HTTPException(status_code=400, detail="Invalid SQL query.")

    # Block the most dangerous DROP operations.
    if DROP_DATABASE_OR_SCHEMA_PATTERN.search(normalized):
        raise HTTPException(status_code=400, detail="DROP DATABASE and DROP SCHEMA are not allowed.")

    # Warn on destructive table drops (allowed, but flagged).
    if DROP_TABLE_PATTERN.search(normalized):
        logger.warning("Warning: DROP TABLE is destructive.")

    try:
        result = db.execute(text(normalized))
        rowcount = int(result.rowcount) if result.rowcount is not None else 0

        if first_word == "SELECT":
            rows = [dict(row) for row in result.mappings().all()]
            return {"results": rows, "rowcount": rowcount}

        # Persist DDL/DML changes.
        db.commit()
        return {"message": "Query executed successfully", "rowcount": rowcount}
    except SQLAlchemyError:
        raise HTTPException(status_code=400, detail="Invalid SQL query.")
