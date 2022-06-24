import React, { useEffect, useState } from 'react'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'

export const TransactionContext = React.createContext()

let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )

  return transactionContract
}


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [transactionData, setTransactionData] = useState({
      addressTo: '',
      amount: '',
    })

    useEffect(() => {
      checkIfWalletIsConnected()
    }, [])

    const handleChange = (e, name) => {
      setTransactionData(prevState => ({ ...prevState, [name]: e.target.value }))
    }

      /**
   * Send transaction
   * @param {*} metamask Injected MetaMask code from the browser
   * @param {string} currentAccount Current user's pulblic key
   */
  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount,
  ) => {
    try {
      if (!metamask) return alert('Please install metamask ')
      const { addressTo, amount } = transactionData
      const transactionContract = getEthereumContract()

      const parsedAmount = ethers.utils.parseEther(amount)

      await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x7EF40', // 520000 Gwei
            value: parsedAmount._hex,
          },
        ],
      })

      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        'TRANSFER',
      )

      setIsLoading(true)

      await transactionHash.wait()

      await saveTransaction(
        transactionHash.hash,
        amount,
        connectedAccount,
        addressTo,
      )

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Its checks whether MetaMask is install. Otherwise it gives prompt to install MetaMask
   * If MetaMask is connected it fethes account number
   * @param {*} metamask Injected MetaMask code from the browser
   * @returns
   */
   const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ')

      const accounts = await metamask.request({ method: 'eth_accounts' })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
        console.log("MetaMask Wallet is connected.")
      }
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object.')
    }
  }

  /**
   * Connects to MetaMask Extension in the browser
   * @param {*} metamask Injected MetaMask code from the browser
   */
   const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ')

      const accounts = await metamask.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object.')
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        handleChange,
        setTransactionData,
        transactionData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )

}