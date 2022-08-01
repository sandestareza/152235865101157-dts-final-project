import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipesApi = createApi({
    reducerPath: "recipesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://masak-apa-tomorisakura.vercel.app/api",
        prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', '*');
            return headers
        },
    }),
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: () => "/recipes",
        }),
        getDetailReceipes: builder.query({
            query: (key) => `/recipe/${key}`,
        }),
        getKategori: builder.query({
            query: () => "/category/recipes",
        }),
        getDetailKategori: builder.query({
            query: (key) => `/category/recipes/${key}`,
        }),
        search: builder.query({
            query: (key) => `/search?q=${key}`,
        })
    }),
});
  
export const {  
    useGetRecipesQuery,
    useGetDetailReceipesQuery,
    useGetKategoriQuery,
    useGetDetailKategoriQuery,
    useSearchQuery,
} = recipesApi;