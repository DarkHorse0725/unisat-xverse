import React, { createContext, useState } from "react";
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  type Address,
} from "sats-connect";
import axios from "axios";
import Inscription from "~/components/home/Inscriptions";

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
  const getContentData = async (id: string) => {
    const URL = `https://api.hiro.so/ordinals/v1/inscriptions/${id}/content`;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: URL,
      headers: {
        Accept: "application/json",
      },
    };
    const result = await axios.request(config);
    return result;
  };
  const fetchXverseData = async () => {
    if (addressInfo && addressInfo?.length > 0) {
      const userAddress = addressInfo[0]?.address || "";

      const totalNumber = await getTotalNumberOfInscriptionData(userAddress);
      console.log("totalNumber => ", totalNumber);
      const _inscription: any[] = [];
      let cnt = 0;
      const offset = 20;
      let error = false;
      while (
        _inscription.length < 20 &&
        totalNumber > cnt * offset 
      ) {
        setTimeout(async () => {
          console.log('cnt = ', cnt, " offset = ", offset, ' cnt * offset = ', cnt * offset)
          const res = await getInscriptionData(
            cnt * offset,
            (cnt + 1) * offset,
            userAddress,
          );

          res.results.forEach(async (element: any) => {
            const temp = await getContentData(element.id);
            try {
              const testData = JSON.parse(temp.data);
              if (testData.p) {
                _inscription.push(testData);
              }
            } catch (err) {
              console.log("JSON error => ", err);
            }
          });

          console.log("_inscription =>", _inscription);
          cnt = cnt + 1;
        }, 5000);
      }
      setData(_inscription);
      setTotal(totalNumber);
    }
  };

  const getTotalNumberOfInscriptionData = async (address: string) => {
    const userAddress = address;
    // "https://api.hiro.so/ordinals/v1/inscriptions?address=" + address,

    let URL = "https://api.hiro.so/ordinals/v1/inscriptions";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: URL,
      headers: {
        Accept: "application/json",
      },
    };

    const result = await axios.request(config);
    return result.data.total;
  };

  const getInscriptionData = async (from = 0, to = 20, address: string) => {
    const userAddress = address;
    // "https://api.hiro.so/ordinals/v1/inscriptions?address=" + userAddress,

    let URL = "https://api.hiro.so/ordinals/v1/inscriptions?";
    if (from >= 0) {
      URL += "from_number=" + from;
    }
    if (from < to && to > 0) {
      URL += "&to_number=" + to;
    }

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: URL,
      headers: {
        Accept: "application/json",
      },
    };

    const result = await axios.request(config);
    return result.data;
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
      onFinish: async (response) => {
        setIsConnected(true);

        setAddressInfo(response.addresses);
      },
      onCancel: () => {
        alert("User cancelled the request");
      },
    });
    setOpenModal(false);
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
    offset: offset,
    network: setNetwork,
    setOpenModal: setOpenModal,
    connectWallet: connectWallet,
    fetchXverseData: fetchXverseData,
  };

  return (
    <WalletConnectContext.Provider value={initValue}>
      <div>{children}</div>
    </WalletConnectContext.Provider>
  );
};

export default WalletProvider;
