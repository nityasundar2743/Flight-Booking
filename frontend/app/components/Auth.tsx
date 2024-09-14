"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaneTakeoff, Mail, Lock, User } from "lucide-react";
import { BackgroundGradient } from "./ui/background-gradient";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ChangeEvent, FormEvent } from 'react';

export function Auth() {
  const [isLoading, setIsLoading] = useState(false);

  // State for login form
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // State for signup form
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');

  // Submit handler types
  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Login Email:', loginEmail);
    console.log('Login Password:', loginPassword);
  };

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Signup Email:', signupEmail);
    console.log('Signup Password:', signupPassword);
  };

  // Change handler types
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setState(e.target.value);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-8">
      <Link href="/" className="flex items-center justify-center mb-8">
        <PlaneTakeoff className="h-10 w-10 text-sky-500 mr-2" />
        <span className="text-2xl font-bold text-sky-700">SkyBooker</span>
      </Link>
      <BackgroundGradient>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to SkyBooker</CardTitle>
            <CardDescription>
              Login or create an account to start booking your flights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="loginEmail">Email</Label>
                      <Input
                        id="loginEmail"
                        type="email"
                        placeholder="m@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="loginPassword">Password</Label>
                      <Input
                        id="loginPassword"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit">
                      Login
                    </Button>
                  </div>
                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                  <div className="flex flex-col space-y-4">
                    
                    <button
                      className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                      type="submit"
                    >
                      <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Google
                      </span>
                      <BottomGradient />
                    </button>
                  </div>
                </form>
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value="signup">
                <form onSubmit={handleSignupSubmit}>
                  <div className="grid gap-4">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                      <LabelInputContainer>
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Tyler"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </LabelInputContainer>
                      <LabelInputContainer>
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Durden"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </LabelInputContainer>
                    </div>
                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="signupEmail">Email Address</Label>
                      <Input
                        id="signupEmail"
                        placeholder="projectmayhem@fc.com"
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input
                        id="signupPassword"
                        placeholder="••••••••"
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      />
                    </LabelInputContainer>

                    <Button type="submit">
                      Sign up &rarr;
                    </Button>
                  </div>
                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                  <div className="flex flex-col space-y-4">
                    <button
                      className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                      type="submit"
                    >
                      <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Google
                      </span>
                      <BottomGradient />
                    </button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </BackgroundGradient>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
