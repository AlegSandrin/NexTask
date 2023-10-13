import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Navbar } from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider, ReactQueryProvider } from './Providers';
import { AlertController } from '@/components/AlertController';
import { DialogController } from '@/components/DialogController';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NexTask',
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
          <ReactQueryProvider>
            <div className='md:max-w-3xl mx-auto'>
              <Navbar/>
              <AlertController/>
              <DialogController/>
              {children}
            </div>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
