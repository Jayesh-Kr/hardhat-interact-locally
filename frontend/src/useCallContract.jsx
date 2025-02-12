
import { useReadContract } from "wagmi"
import { contractConfig } from "./contractConfig"
const useCallContract = (functionName) => {
    const {data} = useReadContract({
        ...contractConfig,
        functionName : `${functionName}`
    })
  return data
}

export default useCallContract