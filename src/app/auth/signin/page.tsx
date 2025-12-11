import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h1 className="text-xl font-semibold text-center">Iniciar sesión</h1>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="tuemail@correo.com" />
            </div>

            <div className="space-y-2">
              <Label>Contraseña</Label>
              <Input type="password" />
            </div>

            <Button className="w-full mt-2">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
