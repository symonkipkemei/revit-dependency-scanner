'use client'

import { useRouter } from 'next/navigation'
import CoverPage from '@/components/CoverPage'

export default function Home() {
  const router = useRouter()

  const handleEnterApp = () => {
    router.push('/search')
  }

  return <CoverPage onEnterApp={handleEnterApp} />
}
