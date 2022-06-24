import React, { useEffect, useState } from 'react'

export const TransactionContext = React.createContext()

let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState()

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
      }}
    >
      {children}
    </TransactionContext.Provider>
  )

}