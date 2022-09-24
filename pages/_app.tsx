import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../Hooks/useAuth'
import React from 'react'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  ) 
}

export default MyApp
