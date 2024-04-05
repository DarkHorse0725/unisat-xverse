import React, { createContext, useState } from "react";
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  type Address,
} from "sats-connect";

interface LayoutProps {
  children: React.ReactNode;
}
declare global {
  interface Window {
    unisat: any;
  }
}
export const WalletConnectContext = createContext<any>(null);

const WalletProvider = ({ children }: LayoutProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [walletType, setWalletType] = useState("");
  const [balance, setBalance] = useState(0);
  const [addressInfo, setAddressInfo] = useState<Address[]>();
  const [network, setNetwork] = useState(BitcoinNetworkType.Mainnet);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [offset, SetOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const [data, setData] = useState<any>([]);

  const connectUnisateWallet = async () => {
    const unisat = window.unisat;
    if (unisat) {
      try {
        const accounts = await unisat.requestAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccount(accounts[0]);
          const newBalance = await unisat.getBalance(accounts[0]);
          setBalance(newBalance);
          await fetchUnisatData();
          setOpenModal(false);
        }
      } catch (error) {
        console.log("error =>", error);
      }
    }
  };

  const fetchUnisatData = async () => {
    if (isConnected) {
      const res = await window.unisat.getInscriptions(0, 10);
      setTotal(res.total);
      const _data = res.list.filter(
        (row: any) => JSON.parse(row.content).p === "lam",
      );
      setData(_data);
    }
  };

  const fetchXverseData = async () => {
    if (isConnected && addressInfo && addressInfo?.length > 0) {
      const userAddress = addressInfo[0]?.address;
      const URL = `https://api-3.xverse.app/v1/address/${userAddress}/ordinal-utxo?offset=${offset}`;
      const res = await (await fetch(URL)).json();
      const inscriptions = res?.results.map((r: any) => r.inscriptions).flat();
      const _total = res?.total;
      setData(inscriptions);
      setTotal(_total);
    }
  };

  const connectXverseWallet = async () => {
    getAddress({
      payload: {
        purposes: [
          AddressPurpose.Stacks,
          AddressPurpose.Payment,
          AddressPurpose.Ordinals,
        ],
        message: "Needs your address info",
        network: {
          type: network,
        },
      },
      onFinish: (response) => {
        setIsConnected(true);
        setAddressInfo(response.addresses);
      },
      onCancel: () => {
        alert("User cancelled the request");
      },
    });
    setOpenModal(false);
    fetchXverseData();
  };

  const connectWallet = async (wType: string) => {
    switch (wType) {
      case "unisat":
        await connectUnisateWallet();
        break;
      case "xverse":
        await connectXverseWallet();
        break;
      default:
        break;
    }
    setWalletType(wType);
  };

  const initValue = {
    account: account,
    addressInfo: addressInfo,
    isConnected: isConnected,
    openModal: openModal,
    balance: balance,
    walletType: walletType,
    data: data,
    total: total,
    start: start,
    end: end,
    offset:offset,
    network: setNetwork,
    setOpenModal: setOpenModal,
    connectWallet: connectWallet,
  };

  return (
    <WalletConnectContext.Provider value={initValue}>
      <div>{children}</div>
    </WalletConnectContext.Provider>
  );
};

export default WalletProvider;
