'use client'

import { Memory } from "@/app/page";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteMemory } from "./DeleteMemory";
import { EmptyMemories } from "./EmptyMemories";
import Cookies from 'js-cookie'

import { api } from "@/lib/api";

export function Memories() {
 
  const token = Cookies.get('token');
    const getMemoriesQueryFn = async () => {
        const { data } = await api.get('/memories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        return data as Memory[]; 
    
     
    };

       const { data: memories, isLoading, refetch } = useQuery<Memory[]>({ 
      queryKey: ['memories'], 
      queryFn: getMemoriesQueryFn
    });

  
    console.log(memories)      
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg leading-relaxed text-gray-100">Carregando...</p>
      </div>
    )
  }
  if (!memories || memories.length === 0) {
    return <EmptyMemories />;
  }
  function extractFileNameFromUrl(url: string) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

return (
    <div className="flex flex-col gap-10 p-5 lg:p-8">
    {memories.map((memory) => {
      return (
        <div key={memory.id} className="relative space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>
          <DeleteMemory 
            id={memory.id}
            fileName={extractFileNameFromUrl(memory.coverUrl)}
            refetch={refetch}
            />
          <Image
            src={memory.coverUrl}
            alt=""
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )
    })}
  </div>
)

}