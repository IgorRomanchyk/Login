import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.slingacademy.com/v1/sample-data'}),
  endpoints: (build) => ({
    fetchImages: build.query({
      query: (limit: number = 10) => ({
        url: '/photos',
        params: {
          limit: limit
        }
      })
    })
  })
})

export const {useFetchImagesQuery} = imagesApi