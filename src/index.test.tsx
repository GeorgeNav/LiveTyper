import React, { ReactNode } from 'react'
import LiveTyper, { LiveTyperProps } from './index'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/dom'

describe(LiveTyper.name, () => {
  it('can render without any props', () => {
    render(<LiveTyper />)
  })
  describe("text", () => {
    it('undefined', () => {
      expect(render(<LiveTyper />).queryByTestId('text')).not.toBeNull()
    })
    it('empty', () => {
      expect(render(<LiveTyper text='' />).queryByTestId('text')).not.toBeNull()
    })
    it('has somthing', () => {
      expect(render(<LiveTyper text='something' />).queryByTestId('text')).not.toBeNull()
    })
    it('handles updates', async () => {
      let text = 'current text'
      const typeDelay = 10
      const backspaceDelay = 15
      const props: LiveTyperProps = {
        text,
        typeDelay,
        backspaceDelay,
      }
      const element = render(<LiveTyper text={text} {...props} />)
      const updateProps = (props: LiveTyperProps) => render(<LiveTyper {...props} />, { container: element.container })
      await waitFor(() => {
        console.log(element.queryByTestId('text')?.innerHTML)
        expect(element.queryByTestId('text')?.innerHTML).toBe(text)
      })

      text = 'new text'
      updateProps({
        ...props,
        text,
      })
      await waitFor(() => {
        expect(element.queryByTestId('text')?.innerHTML).toBe(text)
      })

      text = ''
      updateProps({
        ...props,
        text: '',
      })
      await waitFor(() => {
        expect(element.queryByTestId('text')?.innerHTML).toBe(text)
      })
    })
  })
  describe("cursor", () => {
    it('disable cursor', () => {
      const element = render(<LiveTyper
        text="test"
        cursor={{
          enabled: false,
        }} />)
      const possibleCursor = element.queryByTestId('cursor')
      expect(possibleCursor).toBeNull()
    })
    it('enable cursor', () => {
      const element = render(<LiveTyper
        text="test"
        cursor={{
          enabled: true,
        }} />)
      const possibleCursor = element.queryByTestId('cursor')
      expect(possibleCursor).not.toBeNull()
    })
  })
  describe("wrapping", () => {
    const wrapper = ({ children, ...props }: {
      children: ReactNode;
      [x: string]: any;
    }) => <div {...props}>{children}</div>
    it("without props", () => {
      const element = render(<LiveTyper
        text="test"
        wrapper={wrapper} />)
      const possibleCursor = element.queryByTestId('cursor')
      expect(possibleCursor).not.toBeNull()
    })
    it("with props", () => {
      const element = render(<LiveTyper
        text="test"
        wrapper={wrapper}
        style={{ color: 'red' }} />)
      const possibleWrapper = element.queryByTestId('wrapper')
      expect(possibleWrapper?.style.color).toBe('red')
    })
  })
})
