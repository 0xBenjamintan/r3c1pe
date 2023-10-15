import "@/styles/globals.css";
import RootLayout from "@/components/Layout";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, mantleTestnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { infuraProvider } from 'wagmi/providers/infura'

export default function App({ Component, pageProps }) {
  const { chains, publicClient } = configureChains(
    [goerli, mantleTestnet],
    [
      //eth goerli
      infuraProvider({ apiKey: 'eb9a664c802d4df8b7b3b43e787c648f' }),
      //alchemyProvider({ apiKey: "8Q39a9O9ye6Ept__YtpkCrJs5yqRrrkj" }),
      jsonRpcProvider({
        rpc: () => ({
          // Mantle Testnet API Key
          http: "https://rpc.ankr.com/mantle_testnet",
        }),
      }),

      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "ETH KL",
    projectId: "37cf5b289b9e3512961b699103908e4a",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
