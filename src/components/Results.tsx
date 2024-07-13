import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { fetchResults, fetchPersonDetails, Person } from '../api'

interface Props {
  searchTerm: string
}

const Results: React.FC<Props> = ({ searchTerm }) => {
  const [results, setResults] = useState<Person[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [totalPages, setTotalPages] = useState(1)

  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentPage = parseInt(queryParams.get('page') || '1', 10)
  const detailsId = queryParams.get('details')

  useEffect(() => {
    fetchResults(searchTerm, currentPage)
  }, [searchTerm, currentPage])

  useEffect(() => {
    if (detailsId) {
      fetchPersonDetails(detailsId)
    } else {
      setSelectedPerson(null)
    }
  }, [detailsId])

  const fetchResults = async (searchTerm: string, page: number = 1) => {
    setLoading(true)
    setError(false)
    try {
      const data = await fetchResults(searchTerm, page)
      setResults(data.results)
      setTotalPages(Math.ceil(data.count / 10))
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchPersonDetails = async (id: string) => {
    setLoading(true)
    setError(false)
    try {
      const person = await fetchPersonDetails(id)
      setSelectedPerson(person)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    queryParams.set('page', newPage.toString())
    history.push({ search: queryParams.toString() })
  }

  const handlePersonClick = (id: string) => {
    queryParams.set('details', id)
    history.push({ search: queryParams.toString() })
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading results. Please try again.</p>
  }

  if (results.length === 0) {
    return <p>No results found.</p>
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <ul>
          {results.map((result) => (
            <li
              key={result.name}
              onClick={() => handlePersonClick(result.name)}
            >
              <h3>Name: {result.name}</h3>
              <p>Age: {result.birth_year}</p>
              <p>Gender: {result.gender}</p>
              <p>Height: {result.height} cm</p>
              <p>Weight: {result.mass} kg</p>
            </li>
          ))}
        </ul>
        <div>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
      {selectedPerson && (
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <button
            onClick={() => history.push({ search: queryParams.toString() })}
          >
            Close
          </button>
          <h2>Name: {selectedPerson.name}</h2>
          <p>Age: {selectedPerson.birth_year}</p>
          <p>Gender: {selectedPerson.gender}</p>
          <p>Height: {selectedPerson.height} cm</p>
          <p>Weight: {selectedPerson.mass} kg</p>
        </div>
      )}
    </div>
  )
}

export default Results
