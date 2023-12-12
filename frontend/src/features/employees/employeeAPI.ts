// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'features/AxiosBaseQuery'

const employees_root = '/employees'

export const employeeAPI = createApi({
  reducerPath: 'employeeAPI',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Employees'],
  endpoints: (builder) => ({

    getEmployees: builder.query({
      query: (params = null) => {
        return {
          url: `${employees_root}/`,
          // url: `${employees_root}/${params != null ? params : ''}`,
          method: 'GET',
          data: {},
        }
      },

      // providesTags: (data) =>
      //   data ? data.results.map(({ id }: { id: number }) => ({ type: 'Employees', id })) : ['Employees'],
    }),

    // getPropertiesFilter: builder.mutation({
    //   query: (params = null) => {
    //     return {
    //       url: `${properties_root}/${params != null ? params : ''}`,
    //       method: 'GET',
    //       data: {},
    //     }
    //   },
    //   // providesTags: (data) =>
    //   //   data ? data.results.map(({ id }: { id: number }) => ({ type: 'Properties', id })) : ['Properties'],
    // }),


    getEmployeeById: builder.query({
      query: (eid:any) => {
        return {
          url: `${employees_root}/${eid}/`,
          method: 'GET',
          data: {}
        }
      },
      // providesTags: (result, error, id) => [{ type: 'Employees', id }],
    }),


    // getProperty: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `properties/${id}/`,
    //       method: 'GET',
    //       data: {}
    //     }
    //   },
    //   // providesTags: (result, error, id) => [{ type: 'Properties', id }],
    // }),



    // updateProperty: builder.mutation({
    //   query: (body) => {
    //     for (const pair of body.entries()) {
    //       console.log(`${pair[0]}, ${pair[1]}`);
    //     }
    //     return {
    //       url: `properties/${body.get('id')}/update/`,
    //       method: 'PUT',
    //       data: body
    //     }
    //   },
    //   invalidatesTags: ['Properties']
    // }),
    // deleteProperty: builder.mutation({
    //   query: (body) => {       
    //     return {
    //       url: `properties/${body.get('id')}/update/`,
    //       method: 'PUT',
    //       data: body
    //     }
    //   },
    //   invalidatesTags: ['Properties']
    // }),


    // // deleteProperty: builder.mutation({
    // //   query: (body) => {

    // //     return {
    // //       url: `properties/${body.id}/delete/`,
    // //       method: 'DELETE',
    // //     }
    // //   },
    // //   invalidatesTags: ['Properties']
    // // }),


    // getAmenities: builder.query({
    //   query: () => {
    //     return {
    //       url: `${properties_root}/amenities/`,
    //       method: 'GET',
    //       data: {},
    //     }
    //   },
    //   providesTags: (result) =>
    //     result ? result.map(({ id }: { id: number }) => ({ type: 'Properties', id })) : ['Properties'],
    // }),
  }),
})

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery
} = employeeAPI

