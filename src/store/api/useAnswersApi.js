import { rootApi } from './api';

export const answerApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnswers: builder.query({
      query: () => '/answers',
    }),
    getAnswerById: builder.query({
      query: (id) => `/answers/${id}`,
    }),
    createAnswer: builder.mutation({
      query: (newAnswer) => ({
        url: '/answers',
        method: 'POST',
        body: newAnswer,
      }),
    }),
    submitAnswers: builder.mutation({
      query: (data) => ({
        url: '/answers',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAnswersQuery,
  useGetAnswerByIdQuery,
  useCreateAnswerMutation,
  useSubmitAnswersMutation, 
} = answerApi;
