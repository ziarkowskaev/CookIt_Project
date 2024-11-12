import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const validationSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
   password: z.string().min(8, {message: "Password is required and must contain at least 8 characters"}),
});

type FormValues = z.infer<typeof validationSchema>;

const Login = () => {
  const form = useForm<FormValues>({
      resolver: zodResolver(validationSchema),
      mode: "onBlur",
      defaultValues: {
        username: "",
        email: "",
        password: ""
      },
    });
  
  const onSubmit = (values: FormValues) => {
      console.log(values);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 max-w-md space-y-5"
        >
          <div className="relative name">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      type="text"
                      className="mt-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="relative email">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="mt-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="relative password">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      className="mt-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-8 w-full">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
