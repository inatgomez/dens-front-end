import { useGoogleAuthenticateMutation } from "@/redux/features/authApiSlice";
import useSocialAuth from "@/hooks/use-social-auth";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export default function Google() {
  const [googleAuthenticate] = useGoogleAuthenticateMutation();
  useSocialAuth(googleAuthenticate);

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader>
          <CardDescription>Loading sign in page</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
