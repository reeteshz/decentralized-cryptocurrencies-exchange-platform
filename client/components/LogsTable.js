import { useEffect, useState, useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const style = {
    tableRow: `bg-[#571089] px-4 py-2 flex justify-around`,
    headRow: `bg-[#47126B] px-4 py-2 flex justify-around`,
    logHeader: `flex justify-around text-2xl text-black font-black pt-8 pb-4`,
    hash: `px-48`
  }

const LogsTable = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { currentAccount } = useContext(TransactionContext)
    const startBlock = 0
    const endBlock = 99999999
    const etherScanURL = "https://rinkeby.etherscan.io/tx/"
    const APIURL = "https://api-rinkeby.etherscan.io/api"
    const divider = 1000000000000000000
    const logLimit = 5

    useEffect(() => {
        if (!data && typeof(currentAccount) != "undefined") {
            setLoading(true)
            URL = `${APIURL}?module=account&action=txlist&address=${currentAccount}&startblock=${startBlock}&endblock=${endBlock}&page=1&offset=${logLimit}&sort=desc&apikey=${process.env.ETHERSCAN_APIKEY}`
            fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
        }
    }, [currentAccount])

    if (isLoading) return <p>Fetching Transaction Logs...</p>
    if (!data) return <p>No profile data</p>
    console.log(data.result)
  return (
    <div>
        <h1 className={style.logHeader}>Past Transactions</h1>
        {data.result.length > 0 && (
            <ul>
                <li key={Math.random()}>
                    <div className={style.headRow}>
                        <div> ID </div>
                        <div className={style.hash}>  Transaction Hash </div> 
                        <div> Amount </div>
                        <div>Action </div>
                    </div>
                </li>
            {data.result.map((thrans, index) => (
                <li key={Math.random()}>
                    <div className={style.tableRow}>
                        <div> { index + 1 } </div>
                        <div>{thrans.hash}</div> 
                        <div> { thrans.value / divider} </div>
                        <div><a key={Math.random()} href={etherScanURL + thrans.hash} target="_blank" rel="noreferrer">View on EtherScan</a> </div>
                    </div>
                    
                </li>
            ))}
            </ul>
        )}
    </div>
  )
}

export default LogsTable