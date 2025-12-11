import { Home, Users, CreditCard } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-card">
      <div className="p-6 font-bold text-xl">Cuenta Sueldo</div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-muted">
          <Home size={18} />
          Dashboard
        </Link>

        <Link href="/dashboard/clientes" className="flex items-center gap-2 p-2 rounded hover:bg-muted">
          <Users size={18} />
          Clientes
        </Link>

        <Link href="/dashboard/tarjetas" className="flex items-center gap-2 p-2 rounded hover:bg-muted">
          <CreditCard size={18} />
          Tarjetas
        </Link>
      </nav>
    </aside>
  )
}
