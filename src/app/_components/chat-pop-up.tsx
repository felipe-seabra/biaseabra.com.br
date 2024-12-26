'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
// import Image from 'next/image'
import Utils from '@/lib/utils'

// import { logo } from '@/images'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
// import { COMPANY_NAME } from '@/database/constants'

export function ChatPopUp() {
  const location = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleTogglePopup = () => {
    setIsOpen(!isOpen)
  }

  const handleClosePopup = () => {
    setIsOpen(false)
  }

  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://api.whatsapp.com/send?phone=5518981029767&text=${encodedMessage}`

    window.open(whatsappURL, '_blank')

    handleClosePopup()
    setMessage('')
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const containerStyle = {
    bottom: isOpen ? '80px' : '35px',
    cursor: isOpen ? 'auto' : 'pointer',
  }

  return (
    <div
      style={containerStyle}
      className={Utils.classNames(
        location.includes('/dashboard') || location.includes('/login')
          ? 'hidden'
          : 'fixed bottom-20 right-8 z-10 flex cursor-pointer items-center transition duration-300 ease-in-out',
      )}
    >
      {!isOpen && (
        <div
          onClick={handleTogglePopup}
          className="flex items-center rounded-full bg-green-600 px-4 py-4 shadow-md hover:bg-green-500"
        >
          <i className="bx bxl-whatsapp text-3xl" style={{ color: 'white' }} />
          {/* <span style={{ fontSize: '14px', color: 'white' }}>
            Olá, como posso ajudar?
          </span> */}
        </div>
      )}
      {isOpen && (
        <>
          {/* <div className="mb-10 mr-3 h-10 w-10 rounded-full shadow-md">
            <Image
              src={logo}
              alt={COMPANY_NAME}
              className="h-auto w-12 rounded-full border-2 border-green-500"
            />
          </div> */}
          <div className="relative mb-10 max-w-60 rounded-xl bg-green-500 p-5 shadow-md">
            <div className="text-sm text-gray-50">
              <p className="my-2">
                Nossa equipe está aqui para responder às suas perguntas.
              </p>
              <p className="my-2">Pergunte-nos qualquer coisa!</p>
            </div>
            <div className="absolute bottom-[-50px] left-0 w-60">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Fale conosco!"
                className="h-10 w-full rounded-xl border-green-500 bg-gray-100 text-gray-700 shadow-md outline-none placeholder:text-gray-500"
              />
              <Button
                type="button"
                onClick={handleSendMessage}
                className="absolute right-2 top-2 h-6 w-12 bg-green-500 text-xs text-gray-100 hover:bg-green-400"
              >
                Enviar
              </Button>
            </div>
            <button
              onClick={handleClosePopup}
              className="absolute right-0 top-[-35px] flex h-7 w-7 items-center justify-center rounded-full bg-green-500 shadow-sm hover:bg-green-400"
            >
              <i className="bx bx-x text-2xl" style={{ color: 'white' }} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
