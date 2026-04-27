import { useState } from 'react'
import axios from 'axios'
import Editor from '@monaco-editor/react'

const DEFAULT_QUERY = `SELECT * FROM users;`

function SqlEditor({ theme, onResults }) {
  const [queryText, setQueryText] = useState(DEFAULT_QUERY)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleRunQuery = async () => {
    if (!queryText.trim()) {
      setErrorMessage('Please enter a SQL query.')
      setSuccessMessage('')
      onResults?.([])
      return
    }

    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await axios.post('https://optisql-production.up.railway.app/execute-query', {
        query: queryText,
      })

      const responseData = response.data
      const tableResults = Array.isArray(responseData)
        ? responseData
        : Array.isArray(responseData?.results)
          ? responseData.results
          : []

      onResults?.(tableResults)

      const firstKeyword = queryText.trim().split(/\s+/)[0]?.toUpperCase() || ''
      const rowcountFromApi =
        typeof responseData?.rowcount === 'number' ? responseData.rowcount : undefined
      const rowsCount =
        typeof rowcountFromApi === 'number' && rowcountFromApi >= 0 ? rowcountFromApi : tableResults.length

      if (['INSERT', 'UPDATE', 'DELETE'].includes(firstKeyword)) {
        setSuccessMessage(
          `Query executed successfully — ${rowsCount} row${rowsCount === 1 ? '' : 's'} affected.`,
        )
      } else if (firstKeyword === 'SELECT') {
        setSuccessMessage(
          `Query executed successfully — ${tableResults.length} row${tableResults.length === 1 ? '' : 's'} returned.`,
        )
      } else {
        setSuccessMessage('Query executed successfully.')
      }
    } catch (error) {
      const backendError =
        error.response?.data?.detail || error.response?.data?.message || error.message
      setErrorMessage(backendError || 'Unable to execute query.')
      setSuccessMessage('')
      onResults?.([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="sql-editor-card">
      <Editor
        height="280px"
        language="sql"
        value={queryText}
        onChange={(value) => setQueryText(value ?? '')}
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
      <button className="run-query-button" type="button" onClick={handleRunQuery} disabled={isLoading}>
        {isLoading ? 'Running...' : 'Run Query'}
      </button>
      {errorMessage && <p className="table-empty-state status-message status-message--error">{errorMessage}</p>}
      {!errorMessage && isLoading && <p className="table-empty-state">Executing query...</p>}
      {!isLoading && !errorMessage && successMessage && (
        <p className="table-empty-state status-message status-message--success">{successMessage}</p>
      )}
    </div>
  )
}

export default SqlEditor
