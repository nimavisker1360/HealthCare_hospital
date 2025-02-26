import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  return (
    <div>
      {!isAuthRoute && (
        <div className="bg-primary text-white py-8 px-10 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/assets/logo-full.svg"
              alt="logo"
              width={128}
              height={256}
            />
          </Link>
          <Link href="/sign-in" className="text-lg underline">
            Sign-in
          </Link>
        
        </div>
      )}
        {children}
    </div>
  );
};

export default PublicLayout;
