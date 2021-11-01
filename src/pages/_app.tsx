/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { AppProps } from 'next/app'

import '@src/styles/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <div className="bg-gradient-to-b from-blue-100 h-screen">
            <Component {...pageProps} />
        </div>
    );
}

export default App
