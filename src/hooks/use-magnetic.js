import { useRef, useState, useEffect } from 'react'

export default function useMagnetic() {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    const element = ref.current
    if (element) {
      // Logic for mouse enter/move is usually handled by framer motion in the component
    }
  }, [])

  return { ref, position, handleMouseMove, reset }
}
