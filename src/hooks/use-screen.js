import { useState, useEffect } from 'react'

const useScreen = () => {
  const isClient = typeof window === 'object'
  const getSize = () => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  })

  const [screen, setScreen] = useState('xl')

  useEffect(() => {
    if (!isClient) return false

    const handleResize = () => {
      const { width } = getSize()
      let screen = 'xl'
      if (width >= 960 && width < 1200) {
        screen = 'lg'
      } else if (width >= 768 && width < 960) {
        screen = 'md'
      } else if (width >= 576 && width < 768) {
        screen = 'sm'
      } else if (width < 576) {
        screen = 'xs'
      }
      setScreen(screen)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return screen
}

export default useScreen
