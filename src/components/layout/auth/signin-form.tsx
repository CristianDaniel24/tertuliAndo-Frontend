import { Drama } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILoginRequest } from "@/types/ILoginRequest";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  className?: string;
  onSubmit: (data: ILoginRequest) => void;
}

export function LoginForm({ className, onSubmit, ...props }: LoginFormProps) {
  const [mail, setMail] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ mail }); // solo se envia el correo
  };

  const handleSignup = () => {
    router.push("/auth/signup");
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
              <span className="sr-only">Inicia sesion chat.</span>
            </a>
            <h1 className="text-xl font-bold">Inicia sesion con tu cuenta.</h1>
            <div className="text-center text-sm">
              No tienes una cuenta?{" "}
              <a
                onClick={handleSignup}
                className="underline underline-offset-4 cursor-pointer"
              >
                Crear cuenta
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
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
              Iniciar Sesion
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        Al hacer clic en Iniciar Sesion, aceptas nuestros{" "}
        <a href="#">Términos de servicio</a> y la{" "}
        <a href="#">política de privacidad</a>.
      </div>
    </div>
  );
}
