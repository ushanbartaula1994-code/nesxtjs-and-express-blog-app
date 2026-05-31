"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { refreshUser } = useAuth();

  const onHandleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const res = await API.post("/api/v1/users/login", {
        email,
        password,
      });

      console.log(res.data);

      await refreshUser();

      setEmail("");
      setPassword("");

      router.push("/posts");
    } catch (error: unknown) {
      console.log(error);

      const err = error as {
        response?: {
          data?: {
            message?: string;
            error?: string;
          };
        };
      };

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong";

      setError(message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#f9f6f2]">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-slate-800">
            Welcome To Blogs
          </CardTitle>
          <p className="text-sm text-slate-500">
            Login to continue reading blogs
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={onHandleForm} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={email}
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                required
                value={password}
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition"
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
