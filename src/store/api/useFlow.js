import { rootApi } from './api';

export const flowApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlows: builder.query({
      query: () => '/flows', 
    }),
    getFlowById: builder.query({
      query: (id) => `/flows/${id}`, 
    }),
    createFlow: builder.mutation({
      query: (newFlow) => ({
        url: '/flows',
        method: 'POST',
        body: newFlow,
      }),
    }),
    updateFlow: builder.mutation({
      query: ({ id, updatedFlow }) => ({
        url: `/flows/${id}`,
        method: 'PATCH',
        body: updatedFlow,
      }),
    }),
    deleteFlow: builder.mutation({
      query: (id) => ({
        url: `/flows/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Exporter les hooks pour utilisation dans les composants
export const { 
  useGetFlowsQuery, 
  useGetFlowByIdQuery,
  useCreateFlowMutation, 
  useUpdateFlowMutation, 
  useDeleteFlowMutation 
} = flowApi;
