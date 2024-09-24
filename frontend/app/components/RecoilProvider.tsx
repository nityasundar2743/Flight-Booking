// components/RecoilProvider.tsx
"use client"; // This must be declared since this component uses hooks (RecoilRoot)

import { RecoilRoot } from "recoil";

export default function RecoilProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
