"use client";
import { usePathname, useRouter } from "next/navigation";
import { FiChevronDown, FiChevronUp, FiMenu, FiX } from "react-icons/fi";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { withAuth } from "./withAuth";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if mobile - only once on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const sections = useMemo(
    () => [
      {
        name: "Dashboard",
        href: "/admin",
        icon: "📊",
      },
      {
        name: "Products",
        href: "",
        icon: "🛍️",
        children: [
          {
            name: "All Products",
            href: "/admin/products",
            icon: "🛍️",
          },
          {
            name: "Add Product",
            href: "/admin/products/add",
            icon: "🛍️",
          },
        ],
      },
      {
        name: "Contact",
        href: "/admin/contact",
        icon: "✉️",
      },
      {
        name: "Settings",
        href: "/admin/settings",
        icon: "⚙️",
      },
    ],
    []
  );

  // Auto-expand parent sections and handle mobile menu - combined into one effect
  useEffect(() => {
    // Auto-expand parent sections when on child routes
    const currentSection = sections.find(section => 
      section.children?.some(child => child.href === pathname)
    );
    
    if (currentSection) {
      setActiveSection(currentSection.name);
    }

    // Close mobile menu on route change
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname, sections, isMobile]);

  const isActiveUrl = useCallback(
    (url: string) => {
      return pathname === url;
    },
    [pathname]
  );

  const toggleSection = useCallback((sectionName: string) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  }, [activeSection]);

  const handleNavigation = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  // Get user email only once on component mount
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) setUserEmail(email);
  }, []);
  
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    router.push("/admin/login");
  }, [router]);

  // Sidebar component with display name
  const Sidebar = useCallback(() => {
    return (
      <div
        className={`bg-gray-800 no-print text-white h-full flex flex-col transition-all duration-300 ${
          isMobile ? "absolute inset-y-0 left-0 z-50 w-64" : "w-64"
        } ${
          isMobile && !isMobileMenuOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-gray-700">
          <Link href={"/"}>
            <Image
              src="/logo2.JPG"
              alt="logo"
              width={100}
              height={100}
              className="w-full h-full rounded-2xl object-cover"
              priority
            />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {sections.map((section) => {
              const isParentActive = section.children 
                ? section.children.some(child => isActiveUrl(child.href))
                : isActiveUrl(section.href);
              
              const shouldShowChildren = activeSection === section.name || isParentActive;

              return (
                <li key={section.name}>
                  {section.children ? (
                    <div>
                      <button
                        onClick={() => toggleSection(section.name)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          isParentActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span>{section.icon}</span>
                          <span>{section.name}</span>
                        </div>
                        {shouldShowChildren ? (
                          <FiChevronUp className="w-4 h-4" />
                        ) : (
                          <FiChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {shouldShowChildren && (
                        <ul className="ml-6 mt-2 space-y-1 border-l-2 border-gray-600 pl-4">
                          {section.children.map((child) => (
                            <li key={child.name}>
                              <button
                                onClick={() => handleNavigation(child.href)}
                                className={`w-full text-left flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                                  isActiveUrl(child.href)
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-700"
                                }`}
                              >
                                <span>{child.icon}</span>
                                <span>{child.name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavigation(section.href)}
                      className={`w-full text-left flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActiveUrl(section.href)
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      <span>{section.icon}</span>
                      <span>{section.name}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info + Logout */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                onClick={handleLogout}
                title="Logout"
              >
                <MdLogout className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">{userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    isMobile, 
    isMobileMenuOpen, 
    sections, 
    isActiveUrl, 
    activeSection, 
    userEmail, 
    toggleSection, 
    handleNavigation, 
    handleLogout
  ]);

  // Set display name for the Sidebar component
  // Sidebar.displayName = 'Sidebar';

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white no-print shadow-sm border-b border-gray-200 z-30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-5 h-5 text-black" />
                ) : (
                  <FiMenu className="w-5 h-5 text-black" />
                )}
              </button>
              <h1 className="text-lg font-semibold text-gray-800">
                {sections.find(
                  (s) =>
                    s.href === pathname ||
                    s.children?.some((child) => child.href === pathname)
                )?.name || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">🔔</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">⚙️</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 text-black">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};

const AdminLayoutWithAuth = withAuth(AdminLayout);
export default AdminLayoutWithAuth;