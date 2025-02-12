import { useRef } from 'react';
import {useAccount, useReadContract, useWriteContract} from 'wagmi';
import { contractConfig } from './contractConfig';
const InteractWithContract = () => {
    const {data:hash , writeContract} = useWriteContract();
    const nameRef = useRef("");
    const rollnoRef = useRef(0);
    const idRef = useRef(0);
    const {address} = useAccount();
    const handleSubmit = () => {
        const name = nameRef.current.value;
        const rollno = rollnoRef.current.value;
        console.log("name : " , name);
        console.log("Roll no : ",rollno);
        writeContract({
            ...contractConfig,
            functionName : 'setChild',
            args : [name,rollno]
        })
        if(hash)
            console.log("hash of writing the contract",hash);
    }

    const getAllChild  = () => {
        const {data:childArr} = useReadContract({
            ...contractConfig,
            functionName : 'getChild'
        });
        console.log([...childArr]);
    }
    const getCaller  = () => {
        const {data:userAddress} = useReadContract({
            ...contractConfig,
            functionName : 'caller'
        });
        console.log(userAddress);
    }
    const getSingleChild  = () => {
        const id = idRef.current.value;
        const {data:child} = useReadContract({
            ...contractConfig,
            functionName : 'getParticular',
            args : [id]
        });
        console.log(child);
    }


  return (
    <>
    <p>Address of connected wallet : {address}</p>
    <div>
        <h1>Writing in contract</h1>
        <input type="text" ref={nameRef} placeholder='Enter your name'/>
        <input type="number" ref={rollnoRef} placeholder='Enter your roll number' />
        <button onClick={handleSubmit}>Submit</button>
    </div>
    <br/>
    <br/>
    <div>
        <h1>Read from contract</h1>
        <button onClick={getAllChild}>Get all Child</button>
        <button onClick={getCaller}>Get caller</button>
        <input type="number" placeholder='Enter the id' />
        <button onClick={getSingleChild}>Get Single Child</button>
    </div>
    </>
  )
}

export default InteractWithContract