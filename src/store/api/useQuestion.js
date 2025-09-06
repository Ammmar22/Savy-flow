import { rootApi } from './api';

export const questionsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => '/questions',
    }),
    getQuestionById: builder.query({
      query: (id) => `/questions/${id}`,
    }),
    getQuestionsByFlow: builder.query({
      query: (flowId) => `/questions/flow/${flowId}`,
    }),
    createQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: '/questions',
        method: 'POST',
        body: newQuestion,
      }),
    }),
    updateQuestion: builder.mutation({
      query: ({ id, updatedQuestion }) => ({
        url: `/questions/${id}`,
        method: 'PATCH',
        body: updatedQuestion,
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Exporter les hooks pour utilisation dans les composants
export const { 
  useGetQuestionsQuery, 
  useGetQuestionByIdQuery,
  useGetQuestionsByFlowQuery,
  useCreateQuestionMutation, 
  useUpdateQuestionMutation, 
  useDeleteQuestionMutation 
} = questionsApi;
