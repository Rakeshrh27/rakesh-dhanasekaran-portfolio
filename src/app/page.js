'use client'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Blog />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2025 Rakesh Dhanasekaran. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-[#E8BABD] transition-colors">English</a>
            <a href="#" className="hover:text-[#E8BABD] transition-colors">Svenska</a>
            <a href="#" className="hover:text-[#E8BABD] transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </main>
  )
}