import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (<>
  <style jsx global>{`
  body {
    background: #5865F2;
  }
`}</style>

  <h1 className='text-3xl text-center text-white my-10'>Discord Bot Panel</h1>

  <div className='flex justify-center'>
    <Link href="/panel"><a className="bg-indigo-50 text-white font-bold py-2 px-4 rounded-full">Open Panel</a></Link>
    
  </div>
  </>)
}
