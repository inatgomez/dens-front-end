import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "@/components/custom/layout";
import IdeasList from "@/components/custom/list-ideas";
import RequireAuth from "@/components/utils/RequireAuth";
import { useGetProjectQuery } from "@/redux/features/projectApiSlice";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: project,
    isLoading,
    isError,
  } = useGetProjectQuery(id as string, {
    skip: !id,
  });

  if (isLoading) {
    return <p className='text-base text-neutral-98'>Loading project</p>;
  }

  if (isError || !project) {
    return <p className='text-base text-neutral-98'>Project not found</p>;
  }

  return (
    <RequireAuth>
      <Head>
        <title>Writer&apos;s Den | Project</title>
        <meta name='description' content='Project content' />
      </Head>
      <Layout>
        <div className='flex flex-col col-span-4 items-center p-4 min-h-screen'>
          <h1 className='text-3xl text-slate-50 font-bold'>{project.name}</h1>
          <p className='mb-2 text-xl text-slate-50'>
            {project.main_genre.charAt(0).toUpperCase() +
              project.main_genre.slice(1).toLowerCase()}
            /{" "}
            {project.mix_genre.charAt(0).toUpperCase() +
              project.mix_genre.slice(1).toLowerCase()}
          </p>
          <IdeasList projectId={id as string} />
        </div>
      </Layout>
    </RequireAuth>
  );
}
