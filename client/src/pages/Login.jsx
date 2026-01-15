import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/dashboard")
  }

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-[radial-gradient(circle_at_top_left,#1e3a8a,#020617)]
      "
    >
      <Card
        className="
          w-full max-w-sm
          rounded-2xl
          bg-white/95
          shadow-[0_25px_50px_rgba(0,0,0,0.35)]
          p-2
        "
      >
        <CardHeader className="space-y-2">
          <CardTitle
            className="
              text-xl font-bold
              bg-gradient-to-r from-blue-900 to-sky-400
              bg-clip-text text-transparent
            "
          >
            Ingresa a tu cuenta
          </CardTitle>

          <CardDescription className="text-slate-500 text-sm">
            Ingresa tu nombre de usuario y clave para acceder al sistema.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            {/* Usuario */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs uppercase tracking-widest text-slate-500"
              >
                Usuario
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="usuario@empresa.com"
                className="
                  bg-slate-50 border-slate-200 rounded-xl px-4 py-3
                  focus-visible:ring-2 focus-visible:ring-sky-400/60
                  focus-visible:ring-offset-0
                "
              />
            </div>

            {/* Clave */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs uppercase tracking-widest text-slate-500"
              >
                Clave
              </Label>

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="
                  bg-slate-50 border-slate-200 rounded-xl px-4 py-3
                  focus-visible:ring-2 focus-visible:ring-sky-400/60
                  focus-visible:ring-offset-0
                "
              />

              {/* Mostrar clave */}
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="show-password"
                  checked={showPassword}
                  onCheckedChange={(value) =>
                    setShowPassword(Boolean(value))
                  }
                />
                <Label
                  htmlFor="show-password"
                  className="text-xs text-slate-500 cursor-pointer"
                >
                  Mostrar contraseña
                </Label>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 mt-2">
          <Button
            type="submit"
            className="
              w-full rounded-full
              bg-gradient-to-r from-blue-600 to-sky-400
              text-white font-semibold
              hover:translate-y-[-2px]
              hover:shadow-[0_15px_35px_rgba(56,189,248,0.45)]
              transition-all
            "
            onClick ={handleLogin}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
