import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rakesh Dhanasekaran - Senior .NET Developer',
  description: 'Senior .NET Full-Stack Developer with 9+ years of experience',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}