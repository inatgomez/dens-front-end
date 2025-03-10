import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className='flex flex-col gap-6'>
        <Card>
          <CardHeader>
            <CardDescription>Loading ...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/");
  }

  return <>{children}</>;
}
