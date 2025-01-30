import { useToast } from "@/hooks/use-toast";

export function useGoogleAuth() {
  const { toast } = useToast();

  const continueWithSocialAuth = async (provider: string, redirect: string) => {
    try {
      const url = `${
        process.env.NEXT_PUBLIC_HOST
      }/api/o/${provider}/?redirect_uri=${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_REDIRECT_URL
          : "http://localhost:3000"
      }/auth/${redirect}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 200 && typeof window !== "undefined") {
        window.location.replace(data.authorization_url);
      } else {
        toast({
          description: "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const continueWithGoogle = () =>
    continueWithSocialAuth("google-oauth2", "google");

  return { continueWithGoogle };
}
