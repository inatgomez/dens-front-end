import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import { useToast } from "@/hooks/use-toast";

export default function useSocialAuth(authenticate: any, provider: string) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const effectRan = useRef(false);

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      toast({ description: "Authentication failed" });
      router.push("/login");
      return;
    }

    if (state && code && !effectRan.current) {
      console.log("Initiating social auth flow...");

      authenticate({ provider, state, code })
        .unwrap()
        .then(() => {
          dispatch(setAuth());
          toast({
            description: "Logged in",
          });
          console.log("Auth successful, redirecting...");
          router.push("/dashboard");
        })
        .catch(() => {
          toast({
            description: "Failed to log in",
          });
          router.push("/");
        });
    }

    return () => {
      effectRan.current = true;
    };
  }, [authenticate, provider]);
}
