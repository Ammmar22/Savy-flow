import { rootApi } from './api';

export const startupApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getStartups: builder.query({
      query: () => '/startup', 
    }),
    getStartupById: builder.query({
      query: (id) => `/startup/${id}`, 
    }),
    createStartup: builder.mutation({
      query: (newStartup) => ({
        url: '/startup',
        method: 'POST',
        body: newStartup,
      }),
    }),
    updateStartup: builder.mutation({
      
      query: ({ id, updatedStartup }) => ({
        url: `/startup/${id}`,
        method: 'PATCH',
        body: updatedStartup,
      }),
    }),
    deleteStartup: builder.mutation({
      query: (id) => ({
        url: `/startup/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Exporter les hooks pour utiliser dans les composants
export const { 
  useGetStartupsQuery, 
  useGetStartupByIdQuery,
  useCreateStartupMutation, 
  useUpdateStartupMutation, 
  useDeleteStartupMutation 
} = startupApi;
