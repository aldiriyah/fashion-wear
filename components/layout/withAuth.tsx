
"use client";
import { useEffect, useState, ComponentType } from "react";
import { usePathname, useRouter } from "next/navigation";

export function withAuth<P>(Component: ComponentType<P>) {
	const Wrapper = (props: P & React.PropsWithChildren) => {
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		const router = useRouter();
		const pathname = usePathname();

		useEffect(() => {
			if (pathname === "/login") {
				return;
			}
			const token = localStorage.getItem("token");

			if (!token) {
				router.push("/admin/login");
			} else {
				setIsAuthenticated(true);
			}
		}, [router, pathname]);

		if (!isAuthenticated) {
			return null; 
		}
		return <Component {...props} />;
	};

	Wrapper.displayName = `withAuth(${Component.displayName || Component.name})`;

	return Wrapper;
}