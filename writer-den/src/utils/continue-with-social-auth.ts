import { useToast } from "@/hooks/use-toast";

async function continueWithSocialAuth(provider: string, redirect: string) {
  const { toast } = useToast();

  try {
    const url = `${
      process.env.NEXT_PUBLIC_HOST
    }/api/o/${provider}/?redirect_uri=${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_REDIRECT_URL
        : "http://127.0.0.1:8000"
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
}

export const continueWithGoogle = () =>
  continueWithSocialAuth("google-oauth2", "google");
