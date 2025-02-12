import { useAccount, useConnect, useDisconnect } from "wagmi";

export const LandingPage = () => {
    
  const { connect, connectors } = useConnect();
  const {address} = useAccount();
  const {disconnect} = useDisconnect();
  return (
    <div>
          {
            connectors.map((connector)=>(
              <button key={connector.uid} onClick={()=>connect({connector})}>{connector.name}</button>
            ))
          }
          <div>{address}</div>
          <button onClick={()=>disconnect()}>Disconnect</button>
        </div>
  )
}
