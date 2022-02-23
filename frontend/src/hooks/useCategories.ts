import { BookCategory } from '@book-app-types'
import { fetchCategories } from '../client'
import { useEffect, useState } from 'react'

interface Context {
  categories: BookCategory[],
  loading: boolean,
  error: boolean
}

export const useCategories = (): Context => {
  const [categories, setCategories] = useState<BookCategory[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  
  useEffect(() => {
    setLoading(true)
    setError(false)
    fetchCategories()
      .then(setCategories)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return {
    categories,
    loading,
    error
  }
}