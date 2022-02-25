import { Router } from "express"
import NYTimesBookClient from '../client/nyTimesBookClient'
import * as bookMapper from '../mapper'

const nyTimesApiKey = process.env.NY_TIMES_API_KEY || ''
const router = Router()
const nyTimesClient = new NYTimesBookClient({ apiKey: nyTimesApiKey })

if (nyTimesApiKey === '') {
    console.warn('NY Times API key not defined')
}

router.get('/categories', (_, res) => nyTimesClient
    .getBestSellersListNames()
    .then((response) => res.send(response.results.map(bookMapper.toCategory)))
    .catch(() => {
        res.status(500)
        res.statusMessage = 'Internal server error'
        res.send()
    }))

router.get('/:categoryId/top', (req, res) => {
    const topAmount: number = typeof req.query['topAmount'] === 'string'
        ? parseInt(req.query['topAmount'])
        : 10

    nyTimesClient.getBestSellersList({
        dateString: 'current',
        encodedListName: req.params.categoryId
    }).then(response => res.send(
        response.results.books
            .filter(book => book.rank <= topAmount)
            .map(bookMapper.toBook)))
    .catch(() => res.send([]))
})

router.get('/:isbn/reviews', (req, res) => {
    nyTimesClient.getBookReviews({
        isbn: req.params.isbn
    }).then(response => res.send(
        response.results.map(bookMapper.toReview)))
    .catch(() => res.send([]))
})

export default router