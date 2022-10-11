import '../styles/globals.css'
import Head from 'next/head'
import Router from 'next/router'
import { useState } from "react"
import Loader from '../components/loader'



function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  Router.events.on('routeChangeStart', (url) => {
    console.log('Router is changing to ', url)
    setLoading(true)
  })

  Router.events.on('routeChangeComplete', ()=> {
    setLoading(false)
  })

  return (
  <>
  <Head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
  </Head>

  {loading  ? <Loader/>: <Component {...pageProps} />}
  {/* <Component {...pageProps} /> */}
  </>
  )
}

export default MyApp
