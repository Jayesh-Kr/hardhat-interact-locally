import { useRef, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { contractConfig } from "./contractConfig";
const InteractWithContract = () => {
  const { data: hash, writeContract } = useWriteContract();
  const nameRef = useRef("");
  const rollnoRef = useRef(0);
  const idRef = useRef(0);
  const { address } = useAccount();

  // Calling useReadContract states
  const [getAllChild,setGetAllChild] = useState(false);
  const [getCaller,setGetCaller] = useState(false);
  const [getSingleChild,setGetSingleChild] = useState(false);

  const handleSubmit = () => {
    const name = nameRef.current.value;
    const rollno = rollnoRef.current.value;
    console.log("name : ", name);
    console.log("Roll no : ", rollno);
    writeContract({
      ...contractConfig,
      functionName: "setChild",
      args: [name, rollno],
    });
    if (hash) console.log("hash of writing the contract", hash);
  };

  // Get all child
  const {data:allChild} = useReadContract({
    ...contractConfig,
    functionName : 'getChild',
    query : {
        enabled : getAllChild
    }
  })
  if(allChild) {
    console.log([...allChild]);
    setGetAllChild(false);
  }

// Get caller
const {data:callerAddress} = useReadContract({
    ...contractConfig,
    functionName : 'caller',
    query : {
        enabled : getCaller
    }
})
if(callerAddress) {
    console.log("caller address : " , callerAddress);
    setGetCaller(false);
}

// get single child
const {data:singleChild} = useReadContract({
    ...contractConfig,
    functionName : 'getParticular',
    args : [idRef.current.value],
    query : {
        enabled : getSingleChild
    }
})
if(singleChild) {
    console.log(singleChild);
    setGetSingleChild(false);
}


  return (
    <>
      <p>Address of connected wallet : {address}</p>
      <div>
        <h1>Writing in contract</h1>
        <input type="text" ref={nameRef} placeholder="Enter your name" />
        <input
          type="number"
          ref={rollnoRef}
          placeholder="Enter your roll number"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <br />
      <br />
      <div>
        <h1>Read from contract</h1>
        <button onClick={()=>setGetAllChild(true)}>Get all Child</button>
        <button onClick={()=>setGetCaller(true)}>Get caller</button>
        <input type="number" placeholder="Enter the id" />
        <button onClick={()=>setGetSingleChild(true)}>Get Single Child</button>
      </div>
    </>
  );
};

export default InteractWithContract;
