# [use-theme-switcher][package]

## Because Dark Mode is not enough!

A React hook to switch between multiple themes, including dark mode and more! And the best part? No "white flash of death"!

![nexjs-demo](https://user-images.githubusercontent.com/17012976/100543720-ad835980-3249-11eb-826f-296b559f1837.gif)

## Demo

[Live Example](https://infoxicator.com/)

[Example Repo](https://github.com/infoxicator/site)

## Gatsby Plugin 👀

Using Gatsby?, checkout this plugin instead:

https://github.com/infoxicator/gatsby-plugin-theme-switcher

## Install

```sh
yarn add use-theme-switcher
```
or 

```sh
npm i -S use-theme-switcher
```

## Usage with NextJS

### Add the `ThemeScriptTag` to `_document`.

This script prevents the `white flash of death` for static rendered sites. It is very important that the script is added just after the opening body tag and before any other content.

You can also pass the name of your default light and dark themes as props. These defaults will be used when visitor come to your site for the first time and will try to match their preference using `window.matchMedia("(prefers-color-scheme: dark)");` and the default light theme if this cannot be determined. 

```js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ThemeScriptTag } from 'use-theme-switcher';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        </Head>
        <body>
          <ThemeScriptTag defaultDarkTheme="theme-dark" defaultLightTheme="theme-light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

```

### Add the `ThemeProvider` to `_app.js` 

```js
import '../styles/index.css'
import { ThemeProvider } from 'use-theme-switcher';

function MyApp({ Component, pageProps }) {
  return <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
}

export default MyApp

```

### Add your themes

This plugin adds a custom class name to the `body` element of your site and uses CSS variables to customise your color scheme. Add your themes with the `.theme-*` format:

```css
.theme-twitter {
  --color-bg-primary: #15202B;
  --color-bg-primary-light: #172D3F;
  --color-bg-accent: #1B91DA; 
  --color-bg-accent-light: #1B91DA; 
  --color-bg-secondary: #657786;
  --color-text-link: #1B91DA;    
  --color-bg-compliment: #112b48;
  --color-bg-default: #192734;
  --color-bg-inverse: #1B91DA;
  --color-text-primary: #fff;
  --color-text-secondary: #f2f2f2;
  --color-text-default: #e9e9e9;
  --color-text-default-soft: #6a6a6a;
  --color-text-inverse: #1B91DA;
  --color-text-inverse-soft: #1B91DA;
}
```

### Switching Themes

To switch themes, use the `ThemeContext` hook.

```js
import React, { useContext } from "react"
import { ThemeContext } from 'use-theme-switcher';

const { theme, switchTheme } = useContext(ThemeContext);
```

## Add A Theme Switcher Component

You can implement your own theme switcher component but here is a basic example:

```js
import React from "react";

const myThemes = [
    {
        id: "theme-midnightgreen",
        name: "Midnight Green",
    },
    {
        id: "theme-spacegray",
        name: "Space Gray",
    },
    {
        id: "theme-twitter",
        name: "Twitter Dark",
    }
]

const ThemePicker = ({ theme, setTheme }) => {
    if (theme) {
        return (
            <div>
            {myThemes.map((item, index) => {
                const nextTheme = myThemes.length -1 === index ? myThemes[0].id : myThemes[index+1].id;
                
                return item.id === theme ? (
                    <div key={item.id} className={item.id}>
                    <button
                        aria-label={`Theme ${item.name}`}
                        onClick={() => setTheme(nextTheme)}
                    >
                        {item.name}
                    </button>
                    </div>
                ) : null;
                    }
                )}
            </div>
        );
    }
    return null;
};

export default ThemePicker;

```

## `ThemeScriptTag` Properties

| Prop               | Description
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `defaultDarkTheme`   | Initial theme name when `prefers-color-scheme: dark`                                                                                                      
| `defaultLightTheme`  | Initial theme name when preference cannot be determined                                                                                                  |
| `themeStorageKey`      | Key to persist the theme name in `localStorage`. Default = `"theme"`.                                                                                                                                                                                                                   |
| `minify` | Minify the injected script using Terser. Default = `true`.                                                                                                                                                                                                |
### Custom `themeStorageKey`

If you want to change the `themeStorageKey`, ensure the same prop value is passed to both the `ThemeScriptTag` and the `ThemeProvider`. Example:

```js
function MyApp({ Component, pageProps }) {
  return <ThemeProvider themeStorageKey='my-custom-key'>
      <Component {...pageProps} />
    </ThemeProvider>
}
```

```js
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        </Head>
        <body>
          <ThemeScriptTag 
            defaultDarkTheme="theme-dark" 
            defaultLightTheme="theme-light" 
            themeStorageKey='my-custom-key'
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

## Credit

This plugin is based on the work and inspired by [Sam Larsen-Disney](https://sld.codes/) and [Josh Comeau](https://www.joshwcomeau.com/)


## LICENSE

[MIT][LICENSE] LICENSE

[package]: https://www.npmjs.com/package/use-theme-switcher
[gatsby]: https://www.gatsbyjs.org
[LICENSE]: https://github.com/infoxicator/gatsby-plugin-theme-switcher/blob/master/LICENSE.txt
