import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="bg-gradient-to-tr from-blue-200 to-fuchsia-200 via-white dark:from-blue-950 dark:to-fuchsia-950 dark:via-black bg-fixed min-h-screen">
            <Navbar />
            <div className="flex justify-center h-full w-full">
              <div className="md:w-[748px] lg:w-[1004px] xl:w-[1260px] 2xl:w-[1516px] md:max-w-[748px] lg:max-w-[1004px] xl:max-w-[1260px] 2xl:max-w-[1516px]">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
