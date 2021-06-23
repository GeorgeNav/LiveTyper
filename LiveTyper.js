import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const ACTIONS = {
  TYPE: 'type',
  BACKSPACE: 'backspace',
}

const LiveTyper = ({
  text = '',
  options = {
    typeDelay: 50, // milliseconds
    backspaceDelay: 15, // milliseconds
    cursor: true,
    cursorBlinkSpeed: 350, // milliseconds
  },
  wrapper,
  ...wrapperProps
}) => {
  const index = useRef(-1)
  const cursorRef = useRef()
  const [action, setAction] = useState(ACTIONS.BACKSPACE)
  const [currentText, setCurrentText] = useState('')
  const Wrapper = wrapper

  useEffect(() => {
    if(options.cursor && cursorRef) {
      let cursorOn = true
      const interval = setInterval(
        () => {
          if(cursorOn)
            cursorRef.current.style.opacity = 0.5
          else
            cursorRef.current.style.opacity = 0
          cursorOn = !cursorOn
        },
        options.cursorBlinkSpeed)

      return () => clearInterval(interval)
    } else {
      cursorRef.current.style.opacity = 0
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        if(action === ACTIONS.TYPE) {
          if(index.current <= text.length - 1) {
            setCurrentText(text.slice(0, index.current + 1))
            index.current += 1
          }
        }
        if(action === ACTIONS.BACKSPACE) {
          if(index.current >= 1) {
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
        ? options.typeDelay
        : options.backspaceDelay)

    return () => clearTimeout(timeoutId)
  }, [currentText, setCurrentText, action, setAction])

  useEffect(() => {
    setAction(ACTIONS.BACKSPACE)
  }, [text, setAction])

  return <Wrapper
    {...wrapperProps}>
    {currentText}
    <span ref={cursorRef}>|</span>
  </Wrapper>
}

LiveTyper.propTypes = {
  text: PropTypes.string,
  options: PropTypes.shape({
    typeDelay: PropTypes.number,
    backspaceDelay: PropTypes.number,
    cursor: PropTypes.bool,
    cursorBlinkSpeed: PropTypes.number,
  }),
  wrapper: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
  ]),
}

export default LiveTyper