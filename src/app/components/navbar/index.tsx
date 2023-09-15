import { destroyMe, getMe } from "@/app/service/profile.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const fetchMe = async () => {
    const response = await getMe();
    setIsAuthenticate(response.success);
  };

  const handleLogout = async () => {
    const response = await destroyMe();
    if (response.success) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <nav className="w-full h-14 flex items-center border-b-2 border-b-black bg-white fixed">
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
        <div className="brand-title">
          <Link href="/" className="text-lg font-bold">
            Brik Shop.
          </Link>
        </div>

        <div className="avatar-wrapper">
          {isAuthenticate ? (
            <Button variant="link" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
