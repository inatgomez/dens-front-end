import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import { useToast } from "@/hooks/use-toast";

export default function useSocialAuth(
  authenticate: any,
  code: string,
  state: string
) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const { state, code } = router.query;

    if (state && code) {
      authenticate({ state, code })
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
          router.push("/auth/google");
        });
    }
  }, [authenticate, router, dispatch, toast]);
}
