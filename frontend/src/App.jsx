
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../config";
import { WagmiProvider } from "wagmi";
import { LandingPage } from "./LandingPage";

const queryClient = new QueryClient();
const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <LandingPage/>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
