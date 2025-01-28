import { apiSlice } from "../services/apiSlice";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface GoogleAuthArgs {
  state: string;
  code: string;
}

interface CreateUserResponse {
  success: boolean;
  user: User;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/users/me/",
    }),
    googleAuthenticate: builder.mutation<CreateUserResponse, GoogleAuthArgs>({
      query: ({ state, code }) => ({
        url: `/o/google-oauth2/?state=${encodeURIComponent(
          state
        )}&code=${encodeURIComponent(code)}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/jwt/create/",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ first_name, last_name, email, password, re_password }) => ({
        url: "/users/",
        method: "POST",
        body: { first_name, last_name, email, password, re_password },
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useGoogleAuthenticateMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
} = authApiSlice;
