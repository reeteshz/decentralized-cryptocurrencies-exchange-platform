import { useEffect, useState, useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

const LogsTable = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const { currentAccount } = useContext(TransactionContext)
    console.log(currentAccount)
    const etherScanURL = "https://rinkeby.etherscan.io/tx/"
    useEffect(() => {
        if (!data) {
            setLoading(true)
            fetch('https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0xDA500C9444b7c9A376758086C1573755D69F53Ee&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=RTH8QBD64WAMZG8G5ZTIXJCB6MMA7IGUYR')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
        }
    }, [])

    if (isLoading) return <p>Fetching Transaction Logs...</p>
    if (!data) return <p>No profile data</p>
    console.log(data.result)
  return (
    <div>
        <h4>Logs Table</h4>
        {data.result.length > 0 && (
            <ul>
            {data.result.reverse().map(tras => (
                <p key={Math.random()}>
                    <a key={Math.random()} href={etherScanURL + tras.hash} target="_blank" rel="noreferrer">{tras.hash}</a>
                </p>
            ))}
            </ul>
        )}
    </div>
  )
}

export default LogsTable