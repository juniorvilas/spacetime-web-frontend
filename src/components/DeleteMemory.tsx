'use client'

import { success } from '@/helpers/notify/success';
import { api } from '@/lib/api';
import getQueryClient from '@/lib/getQueryClient';
import { useMutation } from '@tanstack/react-query';
import Cookie from 'js-cookie';
import { Trash2 } from "lucide-react";


export type Props = {
  id: string;
  fileName: string
  refetch: any
}

export type PropsMutation = {
  id: string;
  fileName: string
}

export function DeleteMemory({id, fileName, refetch }: Props){
  const token = Cookie.get('token')


  const handleDeleteMemorie = useMutation(
  ({id, fileName}: PropsMutation) => { 
    return api.delete(`/memories/${id}/${fileName}`,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  {
    onMutate: async (id) => {
      // Opcional: Execute ações antes da mutação
      // Por exemplo, remover temporariamente o item da cache
    },
    onSuccess: () => {
      refetch()      
      success('Memoria deletada com sucesso!');      
    },
    onError: (error) => {
      console.log(error);
    },
  }
);


  return (
    <div className="absolute top-7 right-3 z-10">
       <button
          onClick={() => handleDeleteMemorie.mutateAsync({id, fileName})}
          className="focus:outline-none"
        >
          <Trash2 className="h-4 w-4" />
        </button>       
    </div>
  )
}