import Header from "../components/layouts/Header";
import HomeComponent from "~/components/home/Home";
import WalletProvider from "~/provider/WalletProvider";

export default function Home() {
  return (
    <>
      <WalletProvider>
        <Header />
        <main className="flex">
          <HomeComponent />
        </main>
      </WalletProvider>
    </>
  );
}
