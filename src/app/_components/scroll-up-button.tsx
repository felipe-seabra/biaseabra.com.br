'use client'

import { useState, useEffect } from 'react'

export function ScrollUpButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])
  return (
    <div className="animate-pulse">
      <button
        type="button"
        className={`fixed bottom-80 right-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white text-white shadow-md transition ${isVisible ? '' : 'hidden'}`}
        onClick={scrollToTop}
        title="Voltar ao topo"
      >
        &#8593;
      </button>
    </div>
  )
}
