import { useMemo, useState } from 'react'

const DEFAULT_SQL = `SELECT * FROM users;`

function analyzeSql(sql) {
  const text = (sql || '').trim()
  const upper = text.toUpperCase()
  const issues = []

  const hasSelectStar = /\bSELECT\s+\*/i.test(text)
  const hasLimit = /\bLIMIT\s+\d+/i.test(text)
  const isUpdate = /^\s*UPDATE\b/i.test(text)
  const isDelete = /^\s*DELETE\b/i.test(text)
  const hasWhere = /\bWHERE\b/i.test(text)
  const hasOrderBy = /\bORDER\s+BY\b/i.test(text)
  const hasJoin = /\bJOIN\b/i.test(text)

  if (!text) {
    return { issues: [], stats: null }
  }

  if (hasSelectStar) {
    issues.push({
      severity: 'medium',
      title: 'Avoid SELECT *',
      detail: 'Selecting all columns increases IO, memory usage, and network payload.',
      suggestion: 'Select only required columns (e.g., SELECT id, name, ...).',
      impact: { time: '-10–25%', cost: '-5–15%', cpu: '-5–10%' },
    })
  }

  if (/^\s*SELECT\b/i.test(text) && !hasLimit) {
    issues.push({
      severity: 'low',
      title: 'Missing LIMIT',
      detail: 'Large result sets can slow down the app and consume more memory.',
      suggestion: 'Add a LIMIT while iterating (e.g., LIMIT 100).',
      impact: { time: '-5–20%', cost: '-5–10%', cpu: '-2–6%' },
    })
  }

  if ((isUpdate || isDelete) && !hasWhere) {
    issues.push({
      severity: 'high',
      title: 'Unsafe UPDATE/DELETE (missing WHERE)',
      detail: 'This can modify or delete the entire table.',
      suggestion: 'Add a WHERE clause (and consider a transaction / dry-run first).',
      impact: { time: 'risk', cost: 'risk', cpu: 'risk' },
    })
  }

  if (hasOrderBy && !hasLimit) {
    issues.push({
      severity: 'medium',
      title: 'ORDER BY without LIMIT',
      detail: 'Sorting large datasets is expensive and can spill to disk.',
      suggestion: 'Combine ORDER BY with LIMIT or add a selective WHERE clause.',
      impact: { time: '-10–30%', cost: '-5–15%', cpu: '-5–12%' },
    })
  }

  if (hasJoin && !hasWhere) {
    issues.push({
      severity: 'low',
      title: 'JOIN without selective filters',
      detail: 'Joining large tables without filters can produce huge intermediate results.',
      suggestion: 'Add WHERE filters on joined tables or limit join scope.',
      impact: { time: '-5–20%', cost: '-3–10%', cpu: '-2–8%' },
    })
  }

  // Rough “score” only for UI feedback (not execution logic).
  const score = Math.max(0, 100 - issues.reduce((acc, i) => acc + (i.severity === 'high' ? 35 : i.severity === 'medium' ? 18 : 10), 0))

  const baseMs = 240
  const penalty = issues.reduce((acc, i) => acc + (i.severity === 'high' ? 260 : i.severity === 'medium' ? 120 : 60), 0)
  const originalMs = baseMs + penalty
  const optimizedMs = Math.max(60, Math.round(originalMs * (issues.length ? 0.72 : 1)))

  return {
    issues,
    stats: {
      score,
      originalMs,
      optimizedMs,
      notes: upper.includes('SELECT') ? 'Estimates are heuristic, for guidance only.' : 'Guidance based on common patterns.',
    },
  }
}

function SeverityPill({ severity }) {
  return <span className={`qo-pill qo-pill--${severity}`}>{severity.toUpperCase()}</span>
}

function QueryOptimizer() {
  const [sql, setSql] = useState(DEFAULT_SQL)
  const [didAnalyze, setDidAnalyze] = useState(false)

  const analysis = useMemo(() => analyzeSql(sql), [sql])

  const handleAnalyze = () => {
    setDidAnalyze(true)
  }

  const show = didAnalyze ? analysis : { issues: [], stats: null }

  return (
    <section className="qo">
      <div className="qo-head">
        <div className="qo-label">QUERY OPTIMIZER</div>
        <h2 className="qo-title">Try it instantly</h2>
        <p className="qo-subtitle">
          Paste a query and get optimization feedback cards plus a lightweight performance comparison.
        </p>
      </div>

      <div className="qo-grid">
        <div className="qo-editorCard">
          <label className="qo-editorLabel" htmlFor="qo-sql">
            SQL
          </label>
          <textarea
            id="qo-sql"
            className="qo-editor"
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            spellCheck={false}
            rows={7}
          />
          <button className="qo-analyze" type="button" onClick={handleAnalyze}>
            Analyze ▶
          </button>
        </div>

        <div className="qo-resultsCard">
          {!didAnalyze && (
            <div className="qo-empty">
              Click <strong>Analyze ▶</strong> to see optimization feedback.
            </div>
          )}

          {didAnalyze && show.issues.length === 0 && (
            <div className="qo-empty">
              No issues found. Your query looks clean based on common patterns.
            </div>
          )}

          {didAnalyze && show.issues.length > 0 && (
            <>
              <div className="qo-cards">
                {show.issues.map((issue) => (
                  <article key={issue.title} className="qo-issue">
                    <div className="qo-issueTop">
                      <SeverityPill severity={issue.severity} />
                      <h3 className="qo-issueTitle">{issue.title}</h3>
                    </div>
                    <p className="qo-issueDetail">{issue.detail}</p>
                    <p className="qo-issueSuggestion">
                      <span className="qo-muted">Suggestion:</span> {issue.suggestion}
                    </p>
                    <div className="qo-impactRow">
                      <span className="qo-impact">Time: {issue.impact.time}</span>
                      <span className="qo-impact">CPU: {issue.impact.cpu}</span>
                      <span className="qo-impact">Cost: {issue.impact.cost}</span>
                    </div>
                  </article>
                ))}
              </div>

              {show.stats && (
                <div className="qo-compare">
                  <div className="qo-compareHead">
                    <div>
                      <div className="qo-compareLabel">PERFORMANCE COMPARISON</div>
                      <div className="qo-compareNote">{show.stats.notes}</div>
                    </div>
                    <div className="qo-score">
                      <span className="qo-scoreLabel">Quality</span>
                      <span className="qo-scoreValue">{show.stats.score}/100</span>
                    </div>
                  </div>

                  <div className="qo-tableWrap">
                    <table className="qo-table">
                      <thead>
                        <tr>
                          <th>Version</th>
                          <th>Est. time</th>
                          <th>Est. load</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Original</td>
                          <td>{show.stats.originalMs} ms</td>
                          <td>{show.issues.length > 2 ? 'High' : 'Medium'}</td>
                          <td>Potential inefficiencies detected</td>
                        </tr>
                        <tr>
                          <td>Optimized (suggested)</td>
                          <td>{show.stats.optimizedMs} ms</td>
                          <td>{show.issues.length > 2 ? 'Medium' : 'Low'}</td>
                          <td>Reduce scanned rows + payload</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default QueryOptimizer

