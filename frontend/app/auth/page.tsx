"use client"
import { useToast } from "@/hooks/use-toast";
import { Auth } from "../components/Auth";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function() {
  const {toast} = useToast();
    const userEmail = useRecoilValue(userAtom);
    const router = useRouter();
    useEffect(() => {
      if (userEmail) {
        // If user is not logged in, redirect to the auth page
        toast({
          title: "You are already Logged in",
        });
        router.push("/checkout");
      }
    }, [userEmail, router]);
  

  return (
    <div >
      <Auth/>
    </div>
  );
}
