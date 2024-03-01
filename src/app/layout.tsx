import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'




const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Playhub',
  description: 'A Place for your favorite series, movies, animes, and much more!',
}




type IRootProps = {
  children: React.ReactNode
}

export default function RootLayout( {children}: IRootProps ) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
