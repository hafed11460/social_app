// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'features/AxiosBaseQuery'

const facilities_root = '/facilities'

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
          url: `${facilities_root}/?date=${params != null ? params : ''}`,
          method: 'GET',
          data: {},
        }
      },

      // providesTags: (data) =>
      //   data ? data.map(({ id }: { id: number }) => ({ type: 'Primes', id })) : ['Primes'],
    }),
    createFacilite: builder.mutation({
      query: (body) => {
        console.log(body)       
        return {
          url: `${facilities_root}/create/`,
          method: 'POST',
          data: body
        }
      },
      invalidatesTags: ['Facilities']
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

    createTimeline: builder.mutation({
      query: (body) => {
        console.log(body)       
        return {
          url: `${facilities_root}/timelines/create/`,
          method: 'POST',
          data: body
        }
      },
      invalidatesTags: ['Facilities']
    }),

    updateTimeline: builder.mutation({
        query: (body) => {       
          console.log(body.id)   
          return {
            url: `${facilities_root}/timelines/${body.id}/update/`,
            // url: `properties/${body.get('id')}/update/`,
            method: 'PUT',
            data: body
          }
        },
        invalidatesTags: ['Facilities']
      }),
  }),
})

export const {

  useGetFacilitiesMutation,
  useCreateFaciliteMutation,
  useCreateTimelineMutation,
  useUpdateTimelineMutation,

} = facilitiesAPI

