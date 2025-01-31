import { useGoogleAuthenticateMutation } from "@/redux/features/authApiSlice";
import useSocialAuth from "@/hooks/use-social-auth";

import { Card, CardContent } from "@/components/ui/card";

export default function Google() {
  const [googleAuthenticate] = useGoogleAuthenticateMutation();
  useSocialAuth(googleAuthenticate, "google-oauth2");

  return (
    <div className='m-16 flex justify-center items-center'>
      <Card>
        <CardContent className='flex justify-center p-4'>
          Loading page ...
        </CardContent>
      </Card>
    </div>
  );
}
