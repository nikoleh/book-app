import { BookReview  } from "@book-app-types"

import { fetchReviews } from "../client"

import { useState } from "react"

interface Context {
  reviews: BookReview[],
  getReviews: (isbn: string) => void
  loading: boolean,
  error: boolean,
  success: boolean
}

export const useReviews = (): Context => {
  const [reviews, setReviews] = useState<BookReview[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const getReviews = (isbn: string) => {
    setLoading(true)
    setError(false)
    fetchReviews(isbn)
      .then(reviews => {
        setReviews(reviews)
        setSuccess(true)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  return {
    reviews,
    getReviews,
    loading,
    error,
    success
  }
}