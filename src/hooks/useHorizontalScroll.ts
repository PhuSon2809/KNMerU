import { useCallback, useRef } from 'react'

const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Nếu click vào ảnh, chặn sự kiện mặc định
    if ((e.target as HTMLElement).tagName === 'IMG') {
      e.preventDefault()
    }

    const ele = containerRef.current
    if (!ele) return

    const startPos = {
      left: ele.scrollLeft,
      x: e.clientX
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startPos.x
      ele.scrollLeft = startPos.left - dx
      updateCursor(ele)
    }

    const handleMouseUp = () => {
      removeListeners()
      resetCursor(ele)
    }

    const handleMouseLeave = () => {
      removeListeners()
      resetCursor(ele)
    }

    const removeListeners = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      ele.removeEventListener('mouseleave', handleMouseLeave)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    ele.addEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const ele = containerRef.current
    if (!ele) return

    const touch = e.touches[0]
    const startPos = {
      left: ele.scrollLeft,
      x: touch.clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const dx = touch.clientX - startPos.x
      ele.scrollLeft = startPos.left - dx
      updateCursor(ele)
    }

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      resetCursor(ele)
    }

    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }, [])

  const updateCursor = (ele: HTMLDivElement) => {
    ele.style.cursor = 'grabbing'
    ele.style.userSelect = 'none'
  }

  const resetCursor = (ele: HTMLDivElement) => {
    ele.style.cursor = 'grab'
    ele.style.removeProperty('user-select')
  }

  return { containerRef, handleMouseDown, handleTouchStart }
}

export default useHorizontalScroll
