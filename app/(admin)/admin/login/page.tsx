"use client";

import Loading from "@/components/sharedCom/Loading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    const isLogin = localStorage.getItem("token");

    if (isLogin) {
      router.push("/admin");
    }
    setIsLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        toast.success("Login successful");
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        router.push("/admin");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };
  if (isLoading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 lg:gap-40">
        <div>
          <Image src="/logo.jpg" alt="admin-login" width={500} height={500} />
        </div>
        <div className=" p-8 rounded-lg shadow-xl w-96">
          <h2 className="text-3xl font-bold mb-4 text-black text-center">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border text-black border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border text-black border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
