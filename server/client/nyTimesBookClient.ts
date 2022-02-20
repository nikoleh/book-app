import axios from 'axios'
import { URLSearchParams } from 'url'

import {
    NyTimesBookClientSettings,
    GetBestSellersListRequest,
    GetReviewsRequest,
    BestSellersListNamesResponse,
    BestSellersListResponse,
    BookReviewResponse
} from "./types"

export default class NYTimesBookClient {
    private settings: NyTimesBookClientSettings

    constructor (settings: NyTimesBookClientSettings) {
        let baseUrl = settings.baseUrl
            ? settings.baseUrl
            : 'https://api.nytimes.com/svc/books/v3/'

        if (baseUrl.charAt(baseUrl.length - 1) !== '/')
            baseUrl = baseUrl + '/'

        this.settings = {
            ...settings,
            baseUrl: baseUrl
        }
    }

    public getBestSellersListNames = (): Promise<BestSellersListNamesResponse> => {
        return axios
            .get<BestSellersListNamesResponse>(
                this.createRequestURL(['lists', 'names.json']))
            .then(response => response.data)
    }

    public getBestSellersLists = (request: GetBestSellersListRequest): Promise<BestSellersListResponse> => {
        return axios
            .get<BestSellersListResponse>(
                this.createRequestURL([
                    'lists',
                    request.dateString,
                    `${request.encodedListName}.json`]))
            .then(response => response.data)
    }

    public getBookReviews = (request: GetReviewsRequest): Promise<BookReviewResponse> => {
        return axios
            .get<BookReviewResponse>(
                this.createRequestURL(['reviews.json'], request))
            .then(response => response.data)
    }

    private createRequestURL = (urlParts: string[], parameters?: Record<string, any>): string => {
        return `${this.settings.baseUrl}
            ${urlParts.join('/')}
            ?${new URLSearchParams({...parameters, 'api-key': this.settings.apiKey})}`
    }
}