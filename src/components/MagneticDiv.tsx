import { useState, useEffect, useRef } from 'preact/hooks'

type MagneticDivProps = {
  strength?: number // Intensidad del magnetismo
  repel?: boolean // Si es true, repele el div
  speed?: number // Duración de la transición en segundos
  children?: preact.ComponentChildren
}

const MagneticDiv = ({
  strength = 50,
  repel = false,
  speed = 0.3, // Valor por defecto, ajustable
  children,
}: MagneticDivProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 })

  // Calcular la posición inicial relativa al contenedor posicionado
  useEffect(() => {
    const div = divRef.current
    if (div) {
      const parentRect = div.offsetParent
        ? (div.offsetParent as HTMLElement).getBoundingClientRect()
        : { left: 0, top: 0 }
      const rect = div.getBoundingClientRect()
      const initX = rect.left - parentRect.left
      const initY = rect.top - parentRect.top
      setInitialPosition({ x: initX, y: initY })
      setPosition({ x: initX, y: initY })
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const div = divRef.current
      if (!div) return
      // Posición del contenedor posicionado
      const parentRect = div.offsetParent
        ? (div.offsetParent as HTMLElement).getBoundingClientRect()
        : { left: 0, top: 0 }
      // Coordenadas del mouse relativas al contenedor
      const relativeX = e.clientX - parentRect.left
      const relativeY = e.clientY - parentRect.top
      const dx = relativeX - initialPosition.x
      const dy = relativeY - initialPosition.y
      const distance = Math.sqrt(dx * dx + dy * dy) || 1

      const factor = repel ? -1 : 1
      const force = Math.min(strength / distance, 1)

      setPosition({
        x: initialPosition.x + dx * force * factor,
        y: initialPosition.y + dy * force * factor,
      })
    }

    const handleMouseOut = (e: MouseEvent) => {
      // Si relatedTarget es null, significa que el mouse salió del documento
      if (!e.relatedTarget) {
        setPosition(initialPosition)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [initialPosition, strength, repel])

  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        borderRadius: '10px',
        transition: `top ${speed}s ease-out, left ${speed}s ease-out`,
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  )
}

export default MagneticDiv
