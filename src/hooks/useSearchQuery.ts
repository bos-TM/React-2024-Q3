import { useState, useEffect } from 'react'

const useSearchQuery = (): [string, (term: string) => void] => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || ''
  })

  useEffect(() => {
    return () => {
      localStorage.setItem('searchTerm', searchTerm)
    }
  }, [searchTerm])

  return [searchTerm, setSearchTerm]
}

export default useSearchQuery
