import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import { useToast } from "@/hooks/use-toast";

export default function useSocialAuth(authenticate: any, provider: string) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const effectRan = useRef(false);

  useEffect(() => {
    const { state, code } = router.query;

    if (state && code && !effectRan.current) {
      authenticate({ provider, state, code })
        .unwrap()
        .then(() => {
          dispatch(setAuth());
          toast({
            description: "Logged in",
          });
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
