import { useGoogleAuthenticateMutation } from "@/redux/features/authApiSlice";
import useSocialAuth from "@/hooks/use-social-auth";

import { Card, CardContent } from "@/components/ui/card";

export default function Google() {
  const [googleAuthenticate] = useGoogleAuthenticateMutation();
  useSocialAuth(googleAuthenticate);

  return (
    <div className='flex justify-center items-center gap-6'>
      <Card>
        <CardContent>Loading page</CardContent>
      </Card>
    </div>
  );
}
