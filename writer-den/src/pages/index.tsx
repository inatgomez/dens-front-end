import { useEffect } from "react";
import { useRouter } from "next/router";
import { LoginForm } from "@/components/custom/login-form";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
}
