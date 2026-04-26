function ResultsTable({ results }) {
  if (!results || results.length === 0) {
    return <p className="table-empty-state">No results to display.</p>
  }

  const columns = Object.keys(results[0])

  return (
    <div className="results-table-wrapper">
      <table className="results-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {columns.map((column) => (
                <td key={`${rowIndex}-${column}`}>{String(row[column] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ResultsTable
