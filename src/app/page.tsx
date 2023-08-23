import { ReactQueryHydrate } from '@/client/ReactQueryHidrate/ReactQueryHydrate'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Memories } from '@/components/Memories'
import getQueryClient from '@/lib/getQueryClient'
import { getMemoriesQueryFn } from '@/queryFns/getMemoriesQueryFn'
import { dehydrate } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { cookies } from 'next/headers'

dayjs.locale(ptBR)

export interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const queryClient = getQueryClient();  
  const dehydratedState = dehydrate(queryClient);
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Memories />
    </ReactQueryHydrate>
  )
}