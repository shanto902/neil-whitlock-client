"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Loading from "../Loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard" },
    {
      href: "/dashboard/categories",
      label: "Categories",
      children: [
        {
          href: "/dashboard/categories/add-category",
          label: "Add new Category",
        },
      ],
    },
    { href: "/settings", label: "Settings" },
    { href: "/", label: "Home" },
  ];

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/login");
    }
  }, [sessionStatus, router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (sessionStatus === "loading") {
    return <Loading />;
  }

  return (
    sessionStatus === "authenticated" && (
      <div className="flex h-screen bg-stone-900">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-stone-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
        >
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 md:hidden text-white hover:text-stone-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="mt-8 md:mt-0">
            {menuItems.map((item) => (
              <div key={item.href}>
                <div className="flex justify-between items-center">
                  <Link
                    href={item.href}
                    className="block flex-grow py-2.5 px-4 rounded transition duration-200 hover:bg-stone-700"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      className="py-2.5 px-4 rounded transition duration-200 hover:bg-stone-700"
                      onClick={() => toggleMenu(item.href)}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            expandedMenu === item.href
                              ? "M6 18L18 6M6 6l12 12"
                              : "M6 9l6 6 6-6"
                          }
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && (
                  <div
                    className={`ml-4 overflow-hidden transition-all duration-300 ${
                      expandedMenu === item.href ? "max-h-screen" : "max-h-0"
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-stone-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button
            onClick={() => signOut()}
            className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <header className="bg-stone-800 text-white">
            <div className="flex items-center justify-between px-4 py-3">
              <button className="md:hidden" onClick={toggleSidebar}>
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                </svg>
              </button>
              <div className="text-xl font-bold">Dashboard</div>
              <div>{session?.user?.name}</div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-stone-900 text-white">
            <div className="mx-auto">{children}</div>
          </main>
        </div>
      </div>
    )
  );
};

export default DashboardLayout;
