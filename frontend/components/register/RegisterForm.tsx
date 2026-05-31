"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    username?: string;
    fullname?: string;
  }>({});

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrors({}); // clear previous errors

      await API.post("/api/v1/users/register", {
        username,
        email,
        password,
        fullname,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setFullname("");

      router.push("/login");
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: {
            data?: Record<string, string>;
          };
        };
      };

      setErrors(error?.response?.data?.data || {});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
         
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={fullname}
                onChange={(e) => {
                  setFullname(e.target.value);
                  setErrors((prev) => ({ ...prev, fullname: "" }));
                }}
                placeholder="Enter full name"
                className={errors.fullname ? "border-red-500" : ""}
                required
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">{errors.fullname}</p>
              )}
            </div>

           
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors((prev) => ({ ...prev, username: "" }));
                }}
                placeholder="Enter username"
                className={errors.username ? "border-red-500" : ""}
                required
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="Enter email"
                className={errors.email ? "border-red-500" : ""}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
                placeholder="Enter password"
                className={errors.password ? "border-red-500" : ""}
                required
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

           
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full"
            >
              {isLoading ? "Creating account..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterForm;
