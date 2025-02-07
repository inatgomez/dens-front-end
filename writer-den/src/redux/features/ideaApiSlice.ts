import { apiSlice } from "../services/apiSlice";

export interface Idea {
  unique_id: string;
  title: string;
  content: string;
  category: string;
  project: string;
}

export interface IdeaData {
  title?: string;
  content: string;
  category: string;
  projectId?: string;
}

export interface SearchResult {
  unique_id: string;
  preview_content: string;
  category: string;
  project_name: string;
  project_id: string;
  highlighted_content: string;
  rank: number;
  created_at: string;
}

const ideaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIdeas: builder.query<Idea[], string>({
      query: (projectId) => ({
        url: `/notes/ideas/${projectId}/ideas`,
      }),
    }),
    createIdea: builder.mutation<
      Idea,
      { projectId: string; ideaData: IdeaData }
    >({
      query: ({ projectId, ideaData }) => ({
        url: `/notes/ideas/${projectId}/ideas`,
        method: "POST",
        body: ideaData,
      }),
    }),
    editIdea: builder.mutation<
      Idea,
      { unique_id: string; ideaData: Partial<IdeaData> }
    >({
      query: ({ unique_id, ideaData }) => ({
        url: `/notes/ideas/${unique_id}`,
        method: "PATCH",
        body: ideaData,
      }),
    }),
    deleteIdea: builder.mutation<{ success: boolean }, string>({
      query: (unique_id) => ({
        url: `/notes/ideas/${unique_id}`,
        method: "DELETE",
      }),
    }),
    searchIdeas: builder.query<
      SearchResult[],
      { query: string; category?: string }
    >({
      query: ({ query, category }) => {
        const params = new URLSearchParams({
          q: query,
          ...(category ? { category } : {}),
        });
        return `/notes/ideas/search?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetIdeasQuery,
  useCreateIdeaMutation,
  useEditIdeaMutation,
  useDeleteIdeaMutation,
  useSearchIdeasQuery,
  useLazySearchIdeasQuery,
} = ideaApiSlice;
