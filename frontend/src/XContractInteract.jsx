import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { XcontractConfig } from "./XcontractConfig";
import { useRef } from "react";

const XContractInteract = () => {
  const { address } = useAccount();
  const text = useRef("");
  const { data: hash, writeContract,error,failureCount } = useWriteContract();

//   Fetch all tweets first
  const { data: allTweets } = useReadContract({
      ...XcontractConfig,
      functionName: 'getAllTweets',
      args: [address],
  });
  // Fetch single tweet only if tweets exist
  const { data, error:error2, isPending } = useReadContract({
      ...XcontractConfig,
      functionName: 'getTweet',
      args: [BigInt(0)],
      enabled: allTweets && allTweets.length > 0, // Prevents calling if no tweets
  });

  if (error2) {
      console.error("Contract Read Error:", error);
      return <div>Error: {error.shortMessage || error.message}</div>;
  }
  if (isPending) return <div>Loading...</div>;

  const handleSubmit = () => {
    try {
      const tweet = text.current.value;
      console.log(tweet);
      writeContract({
        ...XcontractConfig,
        functionName: "createTweet",
        args: [tweet],
      });
      console.log("Error while send the tweet : ",error);
      console.log("Failure count : ", failureCount);
      console.log(hash);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
    <div>
        {console.log([...allTweets])}
        {data ? (
            <div>Tweet: {data.tweet}</div>
        ) : (
            <div>No tweets found.</div>
        )}
    </div>
    <br/>
    <hr/>
    <br/>
    <div>
      <input type="text" placeholder="Enter tweet" ref={text} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
    </>
  );
};

export default XContractInteract;
