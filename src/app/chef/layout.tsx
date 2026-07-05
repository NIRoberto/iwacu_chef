import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function ChefLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex-1 flex">
        {children}
      </div>
      <Footer />
    </>
  )
}
