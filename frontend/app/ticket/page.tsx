"use client"
import { useRecoilValue } from "recoil";
import { ViewTicket } from "../components/ViewTicket";
import { userAtom } from "../atoms";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function () {
    const userEmail = useRecoilValue(userAtom);
    const router = useRouter();
    useEffect(() => {
        if (!userEmail) {
          // If user is not logged in, redirect to the auth page
          router.push("/auth");
        }
      }, [userEmail, router]);
    
      // Show a loading or placeholder while checking the auth state
      if (!userEmail) {
        return <div>Loading...</div>;
      }
    return (
        <div>
            <ViewTicket/>
        </div>
    )
}