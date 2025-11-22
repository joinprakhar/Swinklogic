import Hero from '@/components/Hero'
import Navbar from '../../components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        <Hero />
      </main>
    </>
  )
}
