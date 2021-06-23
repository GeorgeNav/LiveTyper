# What is this?

A simple react component that lets you use wrapper component to animate text changing by typing/deleting text change

# Installation

`npm i live-typer --save`

# How to use

```js
import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import LiveTyper from 'live-typer'

const CoolComponent = () => {
  const strings = [
    "Hello world",
    "Greatings friend",
  ]
  const [text, setText] = useState(strings[0])

  return <div>
    <Typewriter
        text={text}
        options={{
          typeDelay: 50, // millisecond delay in typing characters on text prop change (defalut 50)
          backspaceDelay: 15, // millisecond delay in deleting characters on text prop change (default 15)
          cursor: false, // to show or not show animated cursor after last character (default false)
          cursorBlinkSpeed: 250, // how fast the cursor blinks (default 250)
        }}
        wrapper={Typography}
        // any props you want to use with the wrapper component specified above
        variant='h4'
        style={{
          //...
        }}/>
    <button
      onSelect={() =>
        setText((currentText) =>
          currentText === strings[0]
            ? strings[1]
            : strings[0])}>
    </button>
  </div>
}
```
