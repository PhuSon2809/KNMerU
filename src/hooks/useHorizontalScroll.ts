import { useCallback, useRef, useEffect } from 'react'

const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isDragging = useRef(false) // Cờ trạng thái để theo dõi kéo

  useEffect(() => {
    const ele = containerRef.current
    if (ele) {
      ele.style.scrollSnapType = 'x mandatory'
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'IMG') {
      e.preventDefault()
    }

    const ele = containerRef.current
    if (!ele) return

    const startPos = {
      left: ele.scrollLeft,
      x: e.clientX
    }

    isDragging.current = false // Reset trạng thái kéo

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startPos.x
      if (Math.abs(dx) > 5) isDragging.current = true // Đánh dấu là kéo nếu khoảng cách đủ lớn
      ele.scrollLeft = startPos.left - dx
      updateCursor(ele)
    }

    const handleMouseUp = () => {
      removeListeners()
      resetCursor(ele)
    }

    const handleClick = (e: MouseEvent) => {
      if (isDragging.current) {
        e.stopPropagation() // Ngăn chặn sự kiện click
        isDragging.current = false // Reset lại
      }
    }

    const removeListeners = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      ele.removeEventListener('mouseleave', handleMouseUp)
      ele.removeEventListener('click', handleClick)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    ele.addEventListener('mouseleave', handleMouseUp)
    ele.addEventListener('click', handleClick, true) // Lắng nghe sự kiện click ở capture phase để chặn sớm
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const ele = containerRef.current
    if (!ele) return

    const touch = e.touches[0]
    const startPos = {
      left: ele.scrollLeft,
      x: touch.clientX
    }

    isDragging.current = false // Reset trạng thái kéo

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const dx = touch.clientX - startPos.x
      if (Math.abs(dx) > 5) isDragging.current = true // Đánh dấu là kéo nếu khoảng cách đủ lớn
      ele.scrollLeft = startPos.left - dx
      updateCursor(ele)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isDragging.current) {
        e.stopPropagation() // Ngăn chặn click nếu có kéo
      }
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
