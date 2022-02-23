import { Book } from '@book-app-types'
import { fetchTopBooks } from '../client'
import { useState } from 'react'

interface Context {
  books: Book[],
  getBooks: (categoryId: string) => void,
  loading: boolean,
  error: boolean
}

export const useBooks = (): Context => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const getBooks = (categoryId: string) => {
    fetchTopBooks(categoryId)
      .then(setBooks)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  return {
    books,
    getBooks,
    loading,
    error
  }
}