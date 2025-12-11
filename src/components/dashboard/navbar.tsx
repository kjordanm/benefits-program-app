import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  return (
    <header className="h-14 border-b flex items-center px-4 justify-between md:justify-end bg-background">
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>

        <SheetContent side="left" className="p-0">
          <div className="p-4 font-bold text-xl">Cuenta Sueldo</div>
        </SheetContent>
      </Sheet>

      {/* User avatar */}
      <Avatar>
        <AvatarFallback>KJ</AvatarFallback>
      </Avatar>
    </header>
  )
}
