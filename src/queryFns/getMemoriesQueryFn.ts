import { Memory } from "@/app/page";
import { api } from "@/lib/api";
import { cookies } from 'next/headers';

export const getMemoriesQueryFn = async () => {
  const token = cookies().get('token')?.value
    const { data } = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return data as Memory[]; 

 
};