import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { AiOutlineDown } from 'react-icons/ai'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { TransactionContext } from '../context/TransactionContext'

const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center items-center`,
  navItemsContainer: `flex bg-[#191B1F]`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer`,
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#47126B] mx-2 text-[0.9rem] font-semibold cursor-pointer rounded-lg px-4`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#172A42] hover:border-[#172A42] h-full flex items-center justify-center text-[#4F90EA]`,
}

const Header = () => {
  const [selectedNav, setSelectedNav] = useState('swap')
  const { connectWallet, currentAccount } = useContext(TransactionContext)
  const [userName, setUserName] = useState()

  useEffect(() =>{
    {currentAccount ? (
      setUserName(
        `${currentAccount.slice(0, 7)}...${currentAccount.slice(35)}`,
      )
    ) : (
        setUserName('')
    ) }
   
  }, [currentAccount])

  console.log({connectWallet, currentAccount})
  return (
    <div className={style.wrapper}>
      <div className={style.headerLogo}>
        {/* <Image src={uniswapLogo} alt='uniswap' height={40} width={40} /> */}
      </div>
      <div className={style.buttonsContainer}>
        {currentAccount ? (
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={style.buttonTextContainer}> Connected Account {userName}</div>
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${style.button} ${style.buttonPadding}`}
          >
            <div className={style.buttonTextContainer}> Connect Wallet {userName}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header