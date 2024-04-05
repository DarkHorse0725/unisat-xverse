import { useContext, useMemo } from "react";
import { WalletConnectContext } from "~/provider/WalletProvider";

const Header = () => {
  const { setOpenModal, isConnected, account, addressInfo } =
    useContext(WalletConnectContext);

  console.log("address = ", account);
  console.log("addressInfo = ", addressInfo);

  const _address = useMemo(() => {
    if (account && account.length > 0) return account.toString();
    if (addressInfo && addressInfo.length > 0) {
      return addressInfo[0].address.toString();
    }
    return "";
  }, [account, addressInfo]);

  console.log("_address = ", _address);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="flex h-[70px] min-w-full flex-row items-center justify-end bg-purple-100 p-4">
      {!isConnected && (
        <button
          className="select-none rounded-lg bg-green-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={handleOpenModal}
        >
          Connect Wallet
        </button>
      )}
      {isConnected && (
        <button className="select-none rounded-lg bg-green-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          {_address.slice(0, 5) + "..." + _address.slice(-5 )}
        </button>
      )}
    </div>
  );
};

export default Header;
