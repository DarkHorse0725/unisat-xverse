import { useContext, useEffect } from "react";
import WalletConnectModal from "../common/WalletConnectModal";
import Inscription from "./Inscriptions";
import { WalletConnectContext } from "~/provider/WalletProvider";

const HomeComponent = () => {
  
  const { inscriptions, data,fetchXverseData, addressInfo } = useContext(WalletConnectContext);
  useEffect(() => {
    fetchXverseData();
  }, [addressInfo]);
  console.log("home inscriptions => ", inscriptions);
  return (
    <div className="flex w-full p-5">
      <WalletConnectModal />
      <div className="m-5 w-full p-5">
        <div className="flex w-full border-black border-red-100 bg-slate-300 p-3 text-center">
          <div className="flex-1">ID</div>
          <div className="flex-1">Value</div>
          <div className="flex-1">TimeStamp</div>
        </div>
        {data &&
          data.map((row: any) => {
            return <Inscription key={row.inscriptionId} data={row} />;
          })}
      </div>
    </div>
  );
};

export default HomeComponent;
