import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (<>
  <h1 className='text-3xl text-center'>Discord Bot Panel</h1>

  <div className='flex justify-center'>
    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Open Panel</a>
  </div>
  </>)
}
