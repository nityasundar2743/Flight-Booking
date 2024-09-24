"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plane, Cloud, Sun, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSetRecoilState } from "recoil"
import { userAtom } from "../atoms"
import { useToast } from "@/hooks/use-toast"


const TabContent = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-hidden relative h-full rounded-2xl p-8 text-white bg-gradient-to-br from-sky-400 to-indigo-900">
    {children}
    <div className="absolute top-4 right-4 text-white/20">
      <Plane className="h-32 w-32 rotate-45" />
    </div>
    <Cloud className="absolute bottom-4 left-4 h-16 w-16 text-white/20" />
    <Sun className="absolute top-8 left-8 h-12 w-12 text-yellow-300/30" />
  </div>
)

export function Auth() {
  const { toast } = useToast();
  const router=useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const setUserEmail = useSetRecoilState(userAtom);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...signupForm,
      [e.target.id]: e.target.value,
    })
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    })
  }

  const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
  
    try {
      // Send the POST request to the server
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupForm.name,
          email: signupForm.email,
          password: signupForm.password,
        }),
      })
  
      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
        console.log('Signup successful:')
        setUserEmail(data.email)
        router.push(`/checkout`)
        // Redirect to the dashboard or another page if needed
      } else {
        console.error('Signup failed:')
        // Handle error message
      }
    } catch (error) {
      console.error('Error during signup:', error)
      toast({
        title: "Uh-oh! 🚧",
        description: "Something's broken in the background. We’re on it!",
      });
    } finally {
      setIsLoading(false)
    }
  }
  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
  
    try {
      // Send the POST request to the server
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      })
      const data = await response.json();
      // Check if the request was successful
      if (response.ok) {
        console.log('Login successful:')
        setUserEmail(data.email)
        router.push('/checkout')
        // Perform further actions, like redirecting to a dashboard
      } else {
        toast({
          title: "Uh-oh! 🚧",
          description: "Something's broken in the background. We’re on it!",
        });
        console.error('Login failed:')
        // Handle error message
      }
    } catch (error) {
      console.error('Error during login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true)
    // Simulate Google authentication
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGoogleLoading(false)
  }

  const tabs = [
    {
      title: "Sign Up",
      value: "signup",
      content: (
        <TabContent>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Start Your Journey</h2>
          <form onSubmit={signupHandler} className="space-y-4">
          <div>
              <Label htmlFor="text" className="text-white">Name</Label>
              <Input
                id="name"
                type="text"
                value={signupForm.name}
                onChange={handleSignupChange}
                placeholder="sky explorer"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={signupForm.email}
                onChange={handleSignupChange}
                placeholder="skyexplorer@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={signupForm.password}
                onChange={handleSignupChange}
                required
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm text-white">
                I agree to the{" "}
                <a href="#" className="underline">
                  Terms and Conditions
                </a>
              </Label>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-indigo-900 hover:bg-indigo-100"
            >
              {isLoading ? "Preparing for Takeoff..." : "Join SkyJourney"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-indigo-900 px-2 text-white">Or continue with</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={isGoogleLoading}
              className="mt-4 w-full bg-white text-indigo-900 hover:bg-indigo-100"
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 488 512">
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504..."
                  ></path>
                </svg>
              )}
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </Button>
          </div>
        </TabContent>
      ),
    },
    {
      title: "Login",
      value: "login",
      content: (
        <TabContent>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Welcome Back, Explorer</h2>
          <form onSubmit={loginHandler} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="skyexplorer@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-white">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-white underline">
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-indigo-900 hover:bg-indigo-100"
            >
              {isLoading ? "Boarding..." : "Log in to SkyJourney"}
            </Button>
          </form>
        </TabContent>
      ),
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-indigo-100 to-sky-200 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 flex items-center justify-center">
            <Plane className="h-8 w-8 mr-2 rotate-45" />
            SkyBooker
          </h1>
          <p className="text-indigo-700">Your passport to the skies</p>
        </div>
        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-lg">
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {tab.content}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
