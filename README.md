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
    "Greetings friend",
  ]
  const [text, setText] = useState(strings[0])

  return <div>
    <LiveTyper
        text={text}
        options={{
          typeDelay: 50,
          backspaceDelay: 15,
          cursor: true,
          cursorBlinkSpeed: 250,
          cursorOpacity: 0.5,
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
// This will return a span that wraps a span wrapped `text` and conditionally a span wrapped cursor `'|'`
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
        options={{
          typeDelay: 50,
          backspaceDelay: 15,
          cursor: true,
          cursorBlinkSpeed: 250,
          cursorOpacity: 0.5,
        }}/>
    </Typography>
    //...
  </div>
}
```

## License

MIT © [GeorgeNav](https://github.com/GeorgeNav)
