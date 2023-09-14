"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const result = await response.json();

      if (!result.success) {
        router.replace("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <main>{children}</main>;
}
