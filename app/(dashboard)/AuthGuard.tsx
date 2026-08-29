"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../Routes/routes";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check auth cookie or localStorage
    const hasCookie = document.cookie.includes("auth_token=");
    const hasStorage = localStorage.getItem("isLoggedIn") === "true";

    if (hasCookie || hasStorage) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.replace(ROUTES.LOGIN);
    }
  }, [router]);

  // While checking, render nothing to avoid layout flicker
  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
