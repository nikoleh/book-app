import { Book, BookCategory, BookReview } from "./types"
import {
    Book as NYTimesBook,
    BestSellersListNamesResult,
    BookReviewResult
} from "./client/types"

export const toCategory = (result: BestSellersListNamesResult): BookCategory => {
    return {
        id: result.list_name_encoded,
        name: result.list_name
    }
}

export const toBook = (book: NYTimesBook): Book => {
    return {
        isbn: book.primary_isbn13,
        author: book.author,
        title: book.title
    }
}

export const toReview = (result: BookReviewResult): BookReview => {
    return {
        link: result.url,
        reviewer: result.byline
    }
}