import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Search from '../Search'

describe('Search Component', () => {
  it('saves entered value to local storage on search button click', () => {
    const setSearchTerm = jest.fn()
    render(<Search onSearch={setSearchTerm} />)

    const input = screen.getByPlaceholderText(/Search/i)
    const button = screen.getByText(/Search/i)

    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.click(button)

    expect(setSearchTerm).toHaveBeenCalledWith('test')
    expect(localStorage.getItem('searchTerm')).toBe('test')
  })

  it('retrieves value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'test')
    render(<Search onSearch={() => {}} />)

    const input = screen.getByPlaceholderText(/Search/i)
    expect(input).toHaveValue('test')
  })
})
