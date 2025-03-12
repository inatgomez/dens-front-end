import Head from "next/head";
import { LoginForm } from "@/components/custom/login-form";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";

export default function HomePage() {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center gap-6'>
        <Card className='w-44'>
          <CardHeader>
            <CardDescription>Loading sigin page...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isAuthenticated) {
    router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>Writer&apos;s Den | Login Page</title>
        <meta name='description' content="Writer's Den Login Page" />
      </Head>
      <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
        <div className='w-full max-w-sm'>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
