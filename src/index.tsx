import React, { useState, useEffect, useRef } from 'react'

const ACTIONS = {
  TYPE: 'type',
  BACKSPACE: 'backspace',
}

export type LiveTyperOptions = {
  /** delay in each key stroke (milliseconds) */
  typeDelay: number,
  /** delay in each backspace key stroke (milliseconds) */
  backspaceDelay: number,
  /** show cursor while typing */
  cursor: boolean,
  /** blink speed of cursor (milliseconds) */
  cursorBlinkSpeed: number,
  /** opacity value of cursor (0-1) */
  cursorOpacity: number,
}

/** fallback options */
const fallbackOptions: LiveTyperOptions = {
  typeDelay: 50, // milliseconds
  backspaceDelay: 15, // milliseconds
  cursor: true, // bool
  cursorBlinkSpeed: 350, // milliseconds
  cursorOpacity: 0.5 // 0 - 1
}

export type LiveTyperProps = {
  text?: string;
  options?: Partial<LiveTyperOptions>;
  wrapper?: any; // TODO: find a better type for wrapper
  [x: string]: any; // TODO: somehow get wrapper
}

const LiveTyper = ({
  text = '',
  options = fallbackOptions,
  wrapper,
  ...wrapperProps
}: LiveTyperProps) => {
  const index = useRef(-1)
  const cursorRef = useRef<HTMLDivElement>(document.createElement("span") as HTMLDivElement)
  const [action, setAction] = useState(ACTIONS.BACKSPACE)
  const [currentText, setCurrentText] = useState('')
  const Wrapper = wrapper

  useEffect(() => {
    if (options.cursor) {
      let cursorOn = true
      const interval = setInterval(
        () => {
          if (cursorOn)
            cursorRef.current.style.opacity = `${options.cursorOpacity ?? fallbackOptions.cursorOpacity}`
          else
            cursorRef.current.style.opacity = `${0}`
          cursorOn = !cursorOn
        },
        options.cursorBlinkSpeed ?? fallbackOptions.cursorBlinkSpeed)

      return () => clearInterval(interval)
    } else
      cursorRef.current.style.opacity = `${0}`
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        if (action === ACTIONS.TYPE) {
          if (index.current <= text.length - 1) {
            setCurrentText(text.slice(0, index.current + 1))
            index.current += 1
          }
        }
        if (action === ACTIONS.BACKSPACE) {
          if (index.current >= 1) {
            index.current -= 1
            setCurrentText(currentText.slice(0, index.current))
          }
          else {
            index.current = 0
            setAction(ACTIONS.TYPE)
            setCurrentText('')
          }
        }
      },
      action === ACTIONS.TYPE
        ? options.typeDelay ?? fallbackOptions.typeDelay
        : options.backspaceDelay ?? fallbackOptions.backspaceDelay)

    return () => clearTimeout(timeoutId)
  }, [currentText, setCurrentText, action, setAction])

  useEffect(() => {
    setAction(ACTIONS.BACKSPACE)
  }, [text, setAction])

  const textSpan = <span data-testid='text'>{currentText}</span>
  const cursorSpan = options.cursor && <span data-testid='cursor' ref={cursorRef}>|</span>
  const entireSpan = <span data-testid='text-and-cursor'>{textSpan}{cursorSpan}</span>
  return Wrapper
    ? <Wrapper
      data-testid='wrapper'
      {...wrapperProps} >
      {entireSpan}
    </Wrapper>
    : entireSpan
}

export default LiveTyper