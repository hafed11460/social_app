// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'features/AxiosBaseQuery'

const primes_root = '/facilities'

export const facilitiesAPI = createApi({
  reducerPath: 'facilitiesAPI',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Facilities'],
  endpoints: (builder) => ({

    // getPrimetypes: builder.mutation({
    //   query: () => {
    //     return {
    //       url: `${primes_root}/`,
    //       method: 'GET',
    //       data: {},
    //     };
    //   },
    // }),

    getFacilities: builder.mutation({
      query: (params = null) => {
        return {
          // url: `${primes_root}/`,
          url: `${primes_root}/?date=${params != null ? params : ''}`,
          method: 'GET',
          data: {},
        }
      },

      // providesTags: (data) =>
      //   data ? data.map(({ id }: { id: number }) => ({ type: 'Primes', id })) : ['Primes'],
    }),
    // getPrimeById: builder.mutation({
    //   query: (pid:any) => {
    //     return {
    //       url: `${primes_root}/${pid}/`,
    //       method: 'GET',
    //       data: {}
    //     }
    //   },
    //   // providesTags: (result, error, id) => [{ type: 'Employees', id }],
    // }),

    // addPrime: builder.mutation({
    //   query: (body) => {
    //     console.log(body)       
    //     return {
    //       url: `${primes_root}/create/`,
    //       method: 'POST',
    //       data: body
    //     }
    //   },
    //   invalidatesTags: ['Facilities']
    // }),

    // updatePrime: builder.mutation({
    //     query: (body) => {       
    //       console.log(body.id)   
    //       return {
    //         url: `${primes_root}/${body.id}/update/`,
    //         // url: `properties/${body.get('id')}/update/`,
    //         method: 'PUT',
    //         data: body
    //       }
    //     },
    //     invalidatesTags: ['Facilities']
    //   }),
  }),
})

export const {
  useGetFacilitiesMutation,

} = facilitiesAPI

