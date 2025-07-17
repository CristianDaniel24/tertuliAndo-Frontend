"use client";

import { SignupForm } from "@/components/layout/auth/signup-form";
import { clientService } from "@/service/client.service";
import { IClient } from "@/types/client-interface";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Signup() {
  const router = useRouter();

  const handleLogin = async (data: IClient): Promise<void> => {
    try {
      const client: IClient = await clientService.create(data);

      router.push("/auth/signin");
      toast.success("Tu cuenta se creo con exito!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
