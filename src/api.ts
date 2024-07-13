export interface Person {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
}

export interface ApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Person[]
}

export const fetchResults = async (
  searchTerm: string,
  page: number = 1,
): Promise<ApiResponse> => {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data: ApiResponse = await response.json()
  return data
}
