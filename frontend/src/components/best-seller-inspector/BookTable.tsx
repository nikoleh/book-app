import { Book } from '@book-app-types'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import styled from 'styled-components'

import { useState } from 'react'
import { useReviews } from '../../hooks'

interface RowProps {
  book: Book
}

interface TableProps {
  books: Book[]
}

const CollapsibleRow = styled(TableRow)`
      & > * {
        border-bottom: unset;
    }
`

const BookTableRow = (props: RowProps) => {
  const { book } = props
  const [open, setOpen] = useState<boolean>(false)
  const { reviews, getReviews, ...reviewsState } = useReviews()

  const handleOpenRow = () => {
    setOpen(true)
    if (reviewsState.success) return
    getReviews(book.isbn)
  }

  return (
    <>
      <CollapsibleRow>
        <TableCell>
          <IconButton
            size='small'
            onClick={() => open ? setOpen(false) : handleOpenRow()}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{book.title}</TableCell>
        <TableCell>{book.author}</TableCell>
        <TableCell>{book.isbn}</TableCell>
      </CollapsibleRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open}>
            {
              reviewsState.loading
                ? (
                  <Stack alignItems="center">
                    <CircularProgress />
                  </Stack>
                ) : reviews.length > 0 ?
                  <>
                    <Typography variant='h6'>
                      Reviews
                    </Typography>
                    <ul id='review-list'>
                      {reviews.map((review, index) => (
                        <li key={`review-${index}`}>
                          <a href={review.link}>{review.reviewer}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                  : <Typography variant='h6'>
                     No reviews available
                  </Typography>
            }
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export const BookTable = (props: TableProps) => {
  const { books } = props
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>ISBN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book, index) => (
            <BookTableRow
              key={`table-row-${index}`}
              book={book}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}