import Layout from "@/components/custom/layout";
import IdeaInputChat from "@/components/custom/idea-input-chat";
import Head from "next/head";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Writer&apos;s Den | Home</title>
        <meta name='description' content="Welcome to the Writer's Den!" />
      </Head>
      <Layout>
        <div className='flex flex-col items-center justify-center h-full my-20'>
          <h1 className='text-slate-50 text-3xl my-2'>
            What's your next idea?
          </h1>
          <IdeaInputChat />
        </div>
      </Layout>
    </>
  );
}
