import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from "../../configs/AppConfig.js";
import { AUTH_TOKEN } from "../../constants/AuthConstant.js";

export const rootApi = createApi({
  reducerPath: 'AppSavyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const jwtToken = localStorage.getItem(AUTH_TOKEN) || null;
      headers.set('Accept', 'application/json');
      if (jwtToken) {
        headers.set('Authorization', `Bearer ${jwtToken}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    // console.log('Action', action,reducerPath);
  },
});
