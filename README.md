# live-typer

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/live-typer.svg)](https://www.npmjs.com/package/live-typer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Alt Text](./example.gif)

## Install

```bash
npm install --save live-typer
```

## Usage

```jsx
import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import LiveTyper from 'live-typer'

const AnimatedComponent = () => {
  const strings = [
    "Hello world",
    "Greatings friend",
  ]
  const [text, setText] = useState(strings[0])

  return <div>
    <LiveTyper
        text={text}
        options={{ // include everything below
          typeDelay: 50, // millisecond delay in typing characters on text prop change
          backspaceDelay: 15, // millisecond delay in deleting characters on text prop change
          cursor: true, // to show or not show animated cursor after last character
          cursorBlinkSpeed: 250, // how fast the cursor blinks
          cursorOpacity: 0.5, // how opac cursor is when flashing on
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

// Alternatively, wrap the component along with not passing anything into the wrapper prop.
// This will return a fragment that contains a text string and cursor span element
const AnimatedComponent = () => {
  //...
  return <div>
    <Typography
      variant='h4'
      style={{
        //...
      }}/>
      <LiveTyper
        text={text}
        options={{ // include everything below
          typeDelay: 50, // millisecond delay in typing characters on text prop change
          backspaceDelay: 15, // millisecond delay in deleting characters on text prop change
          cursor: true, // to show or not show animated cursor after last character
          cursorBlinkSpeed: 250, // how fast the cursor blinks
          cursorOpacity: 0.5, // how opac cursor is when flashing on
        }}/>
    </Typography>
    //...
  </div>
}
```

## License

MIT © [GeorgeNav](https://github.com/GeorgeNav)
