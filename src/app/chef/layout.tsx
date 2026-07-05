import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Sidebar } from "@/components/layout/Sidebar"

export default function ChefLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
      <Footer />
    </>
  )
}
