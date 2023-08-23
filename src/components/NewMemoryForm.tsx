'use client'

import { error } from '@/helpers/notify/error'
import { success } from '@/helpers/notify/success'
import { api } from '@/lib/api'
import { AxiosError } from 'axios'
import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { MediaPicker } from './MediaPicker'
import getQueryClient from '@/lib/getQueryClient'



export function NewMemoryForm() {
  const queryClient = getQueryClient();
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  
    const formData = new FormData(event.currentTarget)
  
    const fileToUpload = formData.get('coverUrl')
  
    let coverUrl = ''
  
    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)
  
      try {
        const uploadResponse = await api.post('/upload', uploadFormData)
        coverUrl = uploadResponse.data.fileUrl
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err?.response?.status === 413) {
            error('Arquivo não suportado');
          }
          if (err?.response?.status === 400) {
            error('Imagem obrigatórtia!');
          }
        }
        console.error('Erro ao fazer upload de mídia:', error)
        
      }
    }
  
    const token = Cookie.get('token')
    if (coverUrl !== '') {
      try {
        const response = await api.post(
          '/memories',
          {
            coverUrl,
            content: formData.get('content'),
            isPublic: formData.get('isPublic'),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if(response?.status === 200) {       
          queryClient.invalidateQueries({ queryKey: ['memories'] })   
          success('Memoria criada com sucesso!')
        }
      } catch (err: unknown) {       
        console.error('Erro ao criar uma memória:', error)
        
      }
      
    }
   
  
    router.push('/')
  }
  

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}