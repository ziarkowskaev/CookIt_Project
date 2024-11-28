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
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/mutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthParams } from "@/utils/types";

const validationSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {message: "Password is required"}),
});

type FormValues = z.infer<typeof validationSchema>;

const Login = ({setToken}: IAuthParams) => {
  const navigate = useNavigate();

  const [ loginUser, result ] = useMutation(LOGIN_USER, {
    onError: (error) => {
      alert("Wrong credentials. Please try again.");
      console.error('Error has occured:', error);
    }
  });

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-auth-token', "Bearer " + token)
      localStorage.setItem('username', result.data.login.user.username);
      localStorage.setItem('userId', result.data.login.user.id);
      navigate("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const form = useForm<FormValues>({
      resolver: zodResolver(validationSchema),
      mode: "onBlur",
      defaultValues: {
        username: "",
        password: ""
      },
    });

  const onSubmit = (values: FormValues) => {
    const username = values.username;
    const password = values.password;
    loginUser({variables: { username, password } })
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Form {...form}>
        <div className="p-10 bg-white rounded-lg">
        <form
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

          <div className="relative password ">
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

          <Button type="submit" className="mt-8 w-full " >
            Login
          </Button>

          <Button type="submit" className="mt-8 w-full" onClick={() => { navigate("/signup") }}>
            Signup
          </Button>
          
        </form>

        </div>
        
      </Form>
    </div>
  );
}

export default Login;
