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
import { CREATE_USER, LOGIN_USER } from "@/graphql/mutations";
import { Dispatch, SetStateAction, useEffect } from "react";

const validationSchema = z
  .object({
    username: z.string().min(1, {
      message: "Username is required",
    }),
    email: z.string().email().min(1, {
      message: "Must be a valid email",
    }),
    password: z.string().min(8, {message: "Password is required and must contain at least 8 characters"}),
    confirmPassword: z.string().min(8, {message: "Password is required and must contain at least 8 characters"})
  }).refine(( data ) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof validationSchema>;

interface ILoginParams {
  setToken: Dispatch<SetStateAction<string>>,
  setShowLogin: Dispatch<SetStateAction<boolean>>
}

const Signup = ({setToken, setShowLogin}: ILoginParams) => {

  const [ createUser ] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.error('Error has occured:', error);
    }
  });

  const [ loginUser, result ] = useMutation(LOGIN_USER, {
    onError: (error) => {
      console.error('Error has occured:', error);
    }
  });

  useEffect(() => {
    if ( result.data && result.data.login ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-auth-token', "Bearer " + token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  const form = useForm<FormValues>({
      resolver: zodResolver(validationSchema),
      mode: "onBlur",
      defaultValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
    });
  
  const onSubmit = (values: FormValues) => {
    const username = values.username;
    const email = values.email;
    const password = values.password;
    createUser({variables: { username, email, password } })
    // after successfully creating user, run mutation to login user
    loginUser({variables: { username,password } })
  };

  const handleLogin: React.FormEventHandler = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setShowLogin(true);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Form {...form}>
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
                  <FormMessage className="text-red-500 capitalize" />
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

          <div className="relative password">
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
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
          <Button type="submit" className="mt-8 w-full" >
            Signup
          </Button>
          <Button type="submit" className="mt-8 w-full" onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Signup;
