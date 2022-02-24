import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useCategories, useBooks } from '../hooks'
import { BookTable, CategorySelector } from './best-seller-inspector'

export const App = () => {
  const { books, getBooks, ...booksState } = useBooks()
  const { categories } = useCategories()

  return (
    <Container>
      <Stack alignItems="center">
        <Typography variant='h6'>
          Welcome to best seller inspector!
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CategorySelector onSelect={getBooks} categories={categories} />
        </Grid>
        <Grid item xs={12}>
          {booksState.loading
            ? (
              <Stack alignItems="center">
                <CircularProgress />
              </Stack>
            )
            : (
              books.length > 0 ? <BookTable books={books} /> : null
            )}
        </Grid>
      </Grid>
    </Container>
  )
}