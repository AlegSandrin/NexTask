import { Navbar } from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'App de tarefas',
  description: 'Aplicação de cadastro e controle de tarefas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className='md:max-w-3xl mx-auto'>
            <Navbar/>
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
