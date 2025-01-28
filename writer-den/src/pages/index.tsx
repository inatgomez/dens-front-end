import Head from "next/head";
import { LoginForm } from "@/components/custom/login-form";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Writer's Den | Login Page</title>
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
