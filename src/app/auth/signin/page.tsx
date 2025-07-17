"use client";

import { LoginForm } from "@/components/layout/auth/signin-form";
import { signinService } from "@/service/signin.service";
import { ILoginRequest } from "@/types/ILoginRequest";
import { IClient } from "@/types/client-interface";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Signin() {
  const router = useRouter();

  const handleLogin = async (data: ILoginRequest): Promise<void> => {
    try {
      const user: IClient = await signinService.logIn(data);

      router.push("/home");
      toast.success("Bienvenido!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
