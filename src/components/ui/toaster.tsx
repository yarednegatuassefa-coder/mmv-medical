'use client'

import { useState, createContext, useContext, useCallback } from 'react'

interface Toast { id: string; message: string; type?: 'success' | 'error' | 'info' }
interface ToastCtx { toast: (msg: string, type?: Toast['type']) => void }

const Ctx = createContext<ToastCtx>({ toast: () => {} })

export function useToast() { return useContext(Ctx) }

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const add = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  return (
    <Ctx.Provider value={{ toast: add }}>
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id}
            className={`px-4 py-2.5 rounded-md text-sm shadow-lg border pointer-events-auto transition-all
              ${t.type === 'success' ? 'bg-[#111a14] border-[#3dd68c]/30 text-[#3dd68c]'
              : t.type === 'error'   ? 'bg-[#1a1111] border-[#e05252]/30 text-[#e05252]'
              : 'bg-[#111a14] border-white/10 text-[#d4e4d4]'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
