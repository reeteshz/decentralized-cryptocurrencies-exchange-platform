import Head from 'next/head'
import Header from '../components/header'
import Form from '../components/Form'


const style = {
  // https://coolors.co/palette/cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#cdb4db] text-white select-none flex flex-col justify-between`,
}

const Home = () => {
  return (
    <div className={style.wrapper}>
      <Header/>
      <Form/>
      <h2>Transaction history</h2>

    </div>
  )
}

export default Home
