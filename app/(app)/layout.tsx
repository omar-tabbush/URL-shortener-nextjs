import { NavLink } from "@/components/NavLink";
import { AuthNavigationLink } from "@/components/auth/auth-navigation-link";
import { authenticated } from "@/lib/utils";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!authenticated()) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/home">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/custom">Custom Link</NavLink>
          <NavLink href="/analytics?page=0">Analytics</NavLink>
          <AuthNavigationLink
            redirectUrl="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          />
        </nav>
      </header>
      {children}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Omar Tabboush
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            disabled link
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            disabled link
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
