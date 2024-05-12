import { useEffect, useLayoutEffect, useRef } from 'react'

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  attached = true
) => {
  const valueRef = useRef(callback)

  useLayoutEffect(() => {
    valueRef.current = callback
  }, [callback])

  const latestHandler = valueRef

  useEffect(() => {
    if (!attached) return

    const handleClick = (event: MouseEvent) => {
      if (!ref.current) return

      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        latestHandler.current()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref, latestHandler, attached])
}
