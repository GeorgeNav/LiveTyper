import React, { useState, useEffect, useRef } from 'react'

const ACTIONS = {
  TYPE: 'type',
  BACKSPACE: 'backspace',
}

export type Params = {
  /** text to display */
  text: string;
  /** props for span */
  props?: React.HTMLProps<HTMLSpanElement>,
}

export type TextParams = Params & {}

export type CursorParams = Params & {
  /** enable cursor or not */
  enabled?: boolean,
  /** blink speed of cursor (milliseconds) */
  blinkSpeed?: number,
  /** opacity of cursor to blink to (0.0-1.0) */
  opacity?: number,
}

/** fallback text params */
const fallbackText: TextParams = {
  text: '',
}

/** fallback cursor params */
const fallbackCursor: CursorParams = {
  enabled: true,
  text: '|',
  blinkSpeed: 350, // milliseconds
  opacity: 0.5 // 0 - 1
}

function is<T>(x: any): x is T {
  return (x as T) !== undefined;
}

export type LiveTyperProps = {
  /** what to text to type out, or show and customize other things */
  text?: string | Partial<TextParams>;
  /** enable/disable `|` cursor while typing, show your own text as cursor, or show and customize other things */
  cursor?: string | Partial<CursorParams>,
  /** delay in each key stroke (milliseconds) */
  typeDelay?: number;
  /** delay in each backspace key stroke (milliseconds) */
  backspaceDelay?: number;
  wrapper?: any; // TODO: find a better type for wrapper
  [x: string]: any; // TODO: somehow get wrapper
}

const LiveTyper = ({
  text: startingText = fallbackText,
  cursor: startingCursor = fallbackCursor,
  typeDelay = 50,
  backspaceDelay = 15,
  wrapper,
  ...wrapperProps
}: LiveTyperProps) => {
  const cursor: CursorParams = {
    ...fallbackCursor,
    ...typeof startingCursor === 'string'
      ? { text: startingCursor }
      : is<CursorParams>(startingCursor)
        ? startingCursor
        : {},
  }
  const text: TextParams = {
    ...fallbackText,
    ...typeof startingText === 'string'
      ? { text: startingText }
      : is<TextParams>(startingText)
        ? startingText
        : {},
  }

  const index = useRef(-1)
  const cursorRef = useRef<HTMLDivElement>(document.createElement("span") as HTMLDivElement)
  const [action, setAction] = useState(ACTIONS.BACKSPACE)
  const [currentText, setCurrentText] = useState('')
  const Wrapper = wrapper

  useEffect(() => {
    if (cursor.enabled) {
      let cursorOn = true
      const interval = setInterval(
        () => {
          if (cursorOn)
            cursorRef.current.style.opacity = `${cursor.opacity}`
          else
            cursorRef.current.style.opacity = `${0}`
          cursorOn = !cursorOn
        },
        cursor.blinkSpeed)

      return () => clearInterval(interval)
    } else
      cursorRef.current.style.opacity = `${0}`
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        if (action === ACTIONS.TYPE) {
          if (index.current <= text.text.length - 1) {
            setCurrentText(text.text.slice(0, index.current + 1))
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
        ? typeDelay
        : backspaceDelay)

    return () => clearTimeout(timeoutId)
  }, [currentText, setCurrentText, action, setAction])

  useEffect(() => {
    setAction(ACTIONS.BACKSPACE)
  }, [text, setAction])

  const textSpan = <span
    {...text.props ? text.props : {}}
    data-testid='text'>
    {currentText}
  </span>
  const cursorSpan = cursor.enabled && <span
    {...cursor.props ? cursor.props : {}}
    data-testid='cursor'
    ref={cursorRef}>
    {cursor.text}
  </span>
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