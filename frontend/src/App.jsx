
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../config";
import { WagmiProvider } from "wagmi";
import { LandingPage } from "./LandingPage";
import InteractWithContract from "./InteractWithContract";

const queryClient = new QueryClient();
const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <LandingPage/>
        <br/>
        <hr/>
        <hr/>
        <InteractWithContract/>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
