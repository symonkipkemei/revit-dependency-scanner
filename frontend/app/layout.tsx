import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Revit Dependency Scanner',
  description: 'Avoid dependency hell in Revit development. Find compatible package versions for Revit 2021-2025.',
  icons: {
    icon: '/icons/ICON-Black.png',
    shortcut: '/icons/ICON-Black.png',
    apple: '/icons/ICON-Black.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
