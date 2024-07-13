import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useHistory } from 'react-router-dom'
import Pagination from '../Pagination'

const MockPagination: React.FC<{ totalPages: number }> = ({ totalPages }) => {
  const history = useHistory()
  return (
    <Pagination
      currentPage={1}
      totalPages={totalPages}
      onPageChange={(page) => history.push(`/?page=${page}`)}
    />
  )
}

describe('Pagination Component', () => {
  it('updates URL query parameter when page changes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MockPagination totalPages={5} />
      </MemoryRouter>,
    )

    const nextButton = screen.getByText(/Next/i)
    fireEvent.click(nextButton)

    expect(window.location.search).toBe('?page=2')
  })
})
