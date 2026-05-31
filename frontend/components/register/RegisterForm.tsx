"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/registerSchema";
import { z } from "zod";

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setFocus,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      await API.post("/api/v1/users/register", data);

      reset();
      router.push("/login");
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: {
            message?: string;
            data?: Record<string, string>;
          };
        };
      };

      const fieldErrors = error?.response?.data?.data;

      //FIELD LEVEL ERRORS
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([key, value]) => {
          setError(key as keyof RegisterFormData, {
            type: "server",
            message: value as string,
          });
        });

       
        const firstErrorField = Object.keys(fieldErrors)[0];

        if (firstErrorField) {
          setFocus(firstErrorField as keyof RegisterFormData);
        }

        return;
      }

      
      setError("root", {
        message: error?.response?.data?.message || "Registration failed",
      });
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                {...register("fullname")}
                placeholder="Enter full name"
                className={errors.fullname ? "border-red-500" : ""}
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </div>

         
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                {...register("username")}
                placeholder="Enter username"
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

          
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

          
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Enter password"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            
            {"root" in errors && (
              <p className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
                {errors.root?.message}
              </p>
            )}

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
