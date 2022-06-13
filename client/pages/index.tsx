import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between`,
}

const Home: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <h2>header</h2>
      <h2>Main</h2>
      <h2>Transaction history</h2>

    </div>
  )
}

export default Home
