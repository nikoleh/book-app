import Grid from '@mui/material/Grid'

import { useCategories, useBooks } from '../hooks'
import { BookTable, CategorySelector } from './best-seller-inspector'


export const App = () => {
  const { books, getBooks } = useBooks()
  const { categories } = useCategories()

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CategorySelector onSelect={getBooks} categories={categories} />
        </Grid>
        <Grid item xs={12}>
          <BookTable books={books} />
        </Grid>
      </Grid>
    </>
  )
}