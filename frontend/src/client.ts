import { BookCategory, BookReview, Book } from '@book-app-types'

export const fetchCategories = (): Promise<BookCategory[]> =>
  window.fetch(
    '/api/books/categories'
  ).then(response => response.json())

export const fetchReviews = (isbn: string): Promise<BookReview[]> =>
  window.fetch(
    `/api/books/${isbn}/reviews`
  ).then(response => response.json())

export const fetchTopBooks = (categoryId: string): Promise<Book[]> => 
  window.fetch(
    `/api/books/${categoryId}/top`
  ).then(response => response.json())
