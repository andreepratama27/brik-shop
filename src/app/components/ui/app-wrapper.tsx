import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./avatar";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="w-full h-14 flex items-center border-b-2 border-b-black bg-white fixed">
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
          <div className="brand-title">
            <Link href="/" className="text-lg font-bold">
              Brik Shop.
            </Link>
          </div>

          <div className="avatar-wrapper">
            <Avatar role="button">
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl w-full mx-auto pt-20">{children}</div>
    </>
  );
}
