import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login to Writer's Den</CardTitle>
          <CardDescription>Login using your Google Account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant='default' className='w-full'>
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
