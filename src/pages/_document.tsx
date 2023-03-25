import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex-col justify-center relative overflow-hidden sm:py-12'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
