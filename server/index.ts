import express, { static as staticFiles } from 'express'
import NYTimesBookClient from './client/nyTimesBookClient'
import * as bookMapper from './mapper'

const app = express()
const port = process.env.SERVER_PORT || 3000
const nyTimesApiKey = process.env.NY_TIMES_API_KEY || ''
const staticFilesLocation = process.env.STATIC_FILES_LOCATION || 'static'

if (nyTimesApiKey === '') {
    console.warn('NY Times API key not defined')
}

const nyTimesClient = new NYTimesBookClient({ apiKey: nyTimesApiKey })

app.use(staticFiles(staticFilesLocation))

app.get('/api/books/categories', (_, res) => nyTimesClient
    .getBestSellersListNames()
    .then((response) => res.send(response.results.map(bookMapper.toCategory)))
    .catch(() => {
        res.status(500)
        res.statusMessage = 'Internal server error'
        res.send()
    }))

app.get('/api/books/:categoryId/top', (req, res) => {
    const topAmount: number = typeof req.query['topAmount'] === 'string' ? parseInt(req.query['topAmount']) : 10

    nyTimesClient.getBestSellersList({
        dateString: 'current',
        encodedListName: req.params.categoryId
    }).then(response => res.send(
        response.results.books.filter(book => book.rank <= topAmount).map(bookMapper.toBook)))
    .catch(() => res.send([]))
})

app.get('/api/books/:isbn/reviews', (req, res) => {
    nyTimesClient.getBookReviews({
        isbn: req.params.isbn
    }).then(response => res.send(response.results.map(bookMapper.toReview)))
    .catch(() => res.send([]))
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))