import express from 'express'
import NYTimesBookClient from './client/nyTimesBookClient'
import * as bookMapper from './mapper'

const app = express()
const port = process.env.SERVER_PORT || 3000

const nyTimesClient = new NYTimesBookClient({ apiKey: process.env.NY_TIMES_API_KEY || '' })

app.get('/api/books/categories', (_, res) => nyTimesClient
    .getBestSellersListNames()
    .then((response) => res.send(bookMapper.toCategories(response)))
    .catch(() => {
        res.status(500)
        res.statusMessage = 'Internal server error'
        res.send()
    }))

app.get('/api/books/:categoryId/top10', (req, res) => {
    nyTimesClient.getBestSellersList({
        dateString: 'current',
        encodedListName: req.params.categoryId
    }).then(response => res.send(bookMapper.toBooks(response)))
    .catch(() => res.send([]))
})

app.get('/api/books/:isbn/reviews', (req, res) => {
    nyTimesClient.getBookReviews({
        isbn: req.params.isbn
    }).then(response => res.send(bookMapper.toReviews(response)))
    .catch(() => res.send([]))
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))