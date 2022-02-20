export interface NyTimesBookClientSettings {
    baseUrl?: string,
    apiKey: string
}

// Requests

// TODO: add offset attribute
export interface GetBestSellersListRequest {
    dateString: string,
    encodedListName: string
}

// TODO: add title and author attributes
export interface GetReviewsRequest {
    isbn?: string
}

// Responses

interface NYTimesResponse {
    status: string,
    copyright: string,
    num_results: number,
    last_modified?: string
}

export interface BestSellersListNamesResult {
    list_name: string,
    display_name: string,
    list_name_encoded: string,
    oldest_published_date: string,
    newest_published_date: string,
    updated: string
}

export interface BestSellersListNamesResponse extends NYTimesResponse {
    results: BestSellersListNamesResult[]
}

interface BuyLink {
    name: string,
    url: string
}

interface ISBN {
    isbn10: string,
    isbn13: string
}

export interface Book {
    rank: number,
    rank_last_week: number,
    weeks_on_list: number,
    asterisk: number,
    dagger: number,
    primary_isbn10: string,
    primary_isbn13: string,
    publisher: string,
    description: string,
    price: string,
    title: string,
    author: string,
    contributor: string,
    contributor_note: string,
    book_image: string,
    book_image_width: number,
    book_image_height: number,
    amazon_product_uri: string,
    age_group: string,
    book_review_link: string,
    first_chapter_link: string,
    sunday_review_link: string,
    article_chapter_link: string,
    isbns: ISBN[],
    buy_links: BuyLink[],
    book_uri: string
}

export interface BestSellersListResult {
    list_name: string,
    list_name_encoded: string,
    bestsellers_date: string,
    published_date: string,
    published_date_description: string,
    next_published_date: string,
    previous_published_date: string,
    display_name: string,
    normal_list_ends_at: number,
    updated: string,
    books: Book[]
}

export interface BestSellersListResponse extends NYTimesResponse {
    results: BestSellersListResult
}

export interface BookReviewResult {
    url: string,
    publication_date: string,
    byline: string,
    book_title: string,
    book_author: string,
    summary: string,
    isbn13: string[]
}

export interface BookReviewResponse extends NYTimesResponse {
    results: BookReviewResult[]
}