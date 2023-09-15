"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const result = await response.json();

      if (!result.success) {
        router.replace("/login");
      }

      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!success) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return <main>{children}</main>;
}
