import React from 'react'
import { render, screen } from '@testing-library/react'
import Results from '../Results'
import { fetchResults } from '../../api'

jest.mock('../../api')

const mockFetchResults = fetchResults as jest.MockedFunction<
  typeof fetchResults
>

describe('Results Component', () => {
  it('displays loading indicator', async () => {
    mockFetchResults.mockResolvedValue({
      results: [],
      count: 0,
    })

    render(<Results searchTerm="test" />)

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('displays error message on error', async () => {
    mockFetchResults.mockRejectedValue(new Error('Failed to fetch'))

    render(<Results searchTerm="test" />)

    expect(
      await screen.findByText(/Error loading results. Please try again./i),
    ).toBeInTheDocument()
  })

  it('displays no results found message', async () => {
    mockFetchResults.mockResolvedValue({
      results: [],
      count: 0,
    })

    render(<Results searchTerm="test" />)

    expect(await screen.findByText(/No results found./i)).toBeInTheDocument()
  })

  it('displays results', async () => {
    mockFetchResults.mockResolvedValue({
      results: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          height: '172',
          mass: '77',
        },
      ],
      count: 1,
    })

    render(<Results searchTerm="test" />)

    expect(await screen.findByText(/Name: Luke Skywalker/i)).toBeInTheDocument()
  })
})
