import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/notes/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().userReducer.userInfo.token;
      console.log(token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === REHYDRATE) {
  //     return action.payload[reducerPath];
  //   }
  // },
  tagTypes: ["notes"],

  endpoints: (builder) => ({
    notes: builder.query({
      query: () => "/",
      providesTags: ["notes"],
    }),
    createNote: builder.mutation({
      query: (data) => ({
        url: `/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notes"],
    }),
    getSingleNote: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["notes"],
    }),
    updateNote: builder.mutation({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["notes"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notes"],
    }),
  }),
});
export const {
  useNotesQuery,
  useGetSingleNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
