import { useCategories, useBooks } from '../hooks'
import { BookTable, CategorySelector } from './best-seller-inspector'


export const App = () => {
  const { books, getBooks } = useBooks()
  const { categories } = useCategories()

  return (
    <>
      <CategorySelector onSelect={getBooks} categories={categories} />
      <BookTable books={books} />
    </>
  )
}