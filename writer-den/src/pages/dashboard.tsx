import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/components/custom/layout";
import IdeaInputChat from "@/components/custom/idea-input-chat";

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  //if (!user) return null;

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center h-full my-20'>
        <h1 className='text-slate-50 text-3xl my-2'>What's your next idea?</h1>
        <IdeaInputChat />
      </div>
    </Layout>
  );
}
