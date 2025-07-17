import { Drama } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { IClient } from "@/types/client-interface";

interface LoginFormProps {
  className?: string;
  onSubmit: (data: IClient) => void;
}

export function SignupForm({ className, onSubmit, ...props }: LoginFormProps) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ mail, name });
  };

  const handleSignin = () => {
    router.push("/auth/signin");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <Drama className="size-6" />
              </div>
              <span className="sr-only">Crear cuenta chat.</span>
            </a>
            <h1 className="text-xl font-bold">Crea tu cuenta y conectate.</h1>
            <div className="text-center text-sm">
              Ya tienes una cuenta?{" "}
              <a
                onClick={handleSignin}
                className="underline underline-offset-4 cursor-pointer"
              >
                Iniciar sesion
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="anonimo12"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@gmail.com"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Crear Cuenta
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        Al hacer clic en Crear cuenta, aceptas nuestros{" "}
        <a href="#">Términos de servicio</a> y la{" "}
        <a href="#">política de privacidad</a>.
      </div>
    </div>
  );
}
