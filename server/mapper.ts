import { Book, BookCategory, BookReview } from "./types"
import {
    Book as NYTimesBook,
    BestSellersListNamesResponse,
    BestSellersListNamesResult,
    BookReviewResult,
    BestSellersListResponse,
    BookReviewResponse,
} from "./client/types"

const toCategory = (result: BestSellersListNamesResult): BookCategory => {
    return {
        id: result.list_name_encoded,
        name: result.list_name
    }
}

const toBook = (book: NYTimesBook): Book => {
    return {
        isbn: book.primary_isbn13,
        author: book.author,
        title: book.title
    }
}

const toReview = (result: BookReviewResult): BookReview => {
    return {
        link: result.url,
        reviewer: result.byline
    }
}

export const toCategories = (response: BestSellersListNamesResponse): BookCategory[] => response.results.map(toCategory)

export const toBooks = (response: BestSellersListResponse): Book[] => response.results.books.map(toBook)

export const toReviews = (response: BookReviewResponse): BookReview[] => response.results.map(toReview)