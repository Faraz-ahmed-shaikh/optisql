from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

try:
    # Create database engine
    engine = create_engine(DATABASE_URL)

    # Test query
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("✅ Database Connected Successfully!")

except Exception as e:
    print("❌ Connection Failed!")
    print(e)