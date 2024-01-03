// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'features/AxiosBaseQuery'
import { useDispatch } from 'react-redux'
import { IFacilite } from 'types/types.facilities'

const facilities_root = '/facilities'

type FaciliteResponse = IFacilite[]

export const facilitiesAPI = createApi({
  reducerPath: 'facilitiesAPI',
  baseQuery: axiosBaseQuery(),
  // baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Facilite'],
  endpoints: (builder) => ({

    getFacilite: builder.query<IFacilite, number>({
      query: (id: number) => ({
        url: `facilities/${id}/`,
        method: 'GET',
        data: {}
      }),
      providesTags: ['Facilite'],
    }),



    // getFacilites: builder.query({
    //   query: (params = null) => {
    //     return {
    //       // url: `${facilities_root}/?date=${params != null ? params : ''}`,
    //       url: `${facilities_root}/`,
    //       method: 'GET',
    //       data: {},
    //     }
    //   },
    //   // providesTags: (result) =>
    //   // result
    //   //   ? [
    //   //       ...result.map(({ id }:{id:number}) => ({ type: 'IFacilite' as const, id })),
    //   //       { type: 'IFacilite', id: 'LIST' },
    //   //     ]
    //   //   : [{ type: 'IFacilite', id: 'LIST' }],  
    // }),

    // getFacilities: builder.mutation({
    //   query: (params = null) => {
    //     return {
    //       // url: `${primes_root}/`,
    //       url: `${facilities_root}/?date=${params != null ? params : ''}`,
    //       method: 'GET',
    //       data: {},
    //     }
    //   },
    // }),


    createFacilite: builder.mutation({
      query: (body) => {
        console.log(body)
        return {
          url: `${facilities_root}/create/`,
          method: 'POST',
          data: body
        }
      },
      invalidatesTags: ['Facilite']
    }),


    createTimeline: builder.mutation({
      query: (body) => {
        console.log(body)
        return {
          url: `${facilities_root}/timelines/create/`,
          method: 'POST',
          data: body
        }
      },
      invalidatesTags: ['Facilite']
    }),



    // updateTimeline: builder.mutation({
    //   query: ({ id, ...data }) => {
    //     console.log(data)
    //     return {
    //       url: `${facilities_root}/timelines/${id}/update/`,
    //       method: 'PATCH',
    //       data: data
    //     }
    //   },

    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     const { data: updatedPost } = await queryFulfilled
    //     const patchResult = dispatch(
    //       facilitiesAPI.util.updateQueryData('getFacilites', undefined, (draft) => {           
    //         return draft?.filter((item:IFacilite) =>  {
    //           if(item?.id === args?.facilite){
    //               const timelines = item.timelines.filter((timeline)=>timeline.id !== args?.id)
    //               timelines.push(updatedPost)
    //               item.timelines = timelines
    //               return item
    //           }
    //           return item
    //         });
    //         // Object.assign(draft, updatedPost)
    //         // return newData
    //       })
    //     )
    //     try {
    //       await queryFulfilled
    //     } catch {
    //       patchResult.undo()

    //       /**
    //        * Alternatively, on failure you can invalidate the corresponding cache tags
    //        * to trigger a re-fetch:
    //       */
    //       dispatch(facilitiesAPI.util.invalidateTags(['Facilite']))
    //     }
    //   },
    //   // async onQueryStarted(args, { queryFulfilled, dispatch }) {
    //   //   try {
    //   //     const { data: updateFacilite } = await queryFulfilled
    //   //     console.log('updateFacilite', updateFacilite)
    //   //     console.log('args', args)

    //   //     try{              
    //   //       const up = dispatch(
    //   //         facilitiesAPI.util.updateQueryData(
    //   //           'getFacilite',
    //   //           args?.id,
    //   //           (draft) => {  
    //   //             console.log(JSON.stringify(draft))
    //   //             // Object.assign(draft, data)
    //   //           })
    //   //           )
                
    //   //         }catch(err){
    //   //           console.log(err)
    //   //         }
    //   //   } catch (error) {
    //   //     console.log(error)
    //   //   }
    //   // },
    // }),
  }),
})

export const {
  // useGetFacilitesQuery,
  useGetFaciliteQuery,
  // useGetFacilitiesMutation,
  useCreateFaciliteMutation,
  useCreateTimelineMutation,
  // useUpdateTimelineMutation,

} = facilitiesAPI

