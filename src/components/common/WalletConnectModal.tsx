import { useContext, useEffect } from "react";
import { WalletConnectContext } from "~/provider/WalletProvider";

const WalletConnectModal = () => {
  const { openModal, setOpenModal, connectWallet} =
    useContext(WalletConnectContext);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      id="modelConfirm"
      className={`fixed inset-0 z-50 ${openModal === true ? "block" : "hidden"}  h-full w-full overflow-y-auto bg-gray-900 bg-opacity-60 px-4`}
    >
      <div className="relative top-40 mx-auto max-w-md rounded-md bg-white shadow-xl">
        <div className="flex justify-end p-2">
          <button
            onClick={closeModal}
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-6 pt-0 text-center">
          <div className="mb-4 text-3xl	font-semibold">Connect Wallet</div>
          <div className="mb-10 mt-3 flex justify-center gap-10">
            <div
              className="cursor-pointer"
              onClick={() => connectWallet("unisat")}
            >
              <img
                className="h-[150px] w-[150px] rounded-2xl	"
                src="/unisat.jpeg"
                alt="unisat"
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => connectWallet("xverse")}
            >
              <img
                className="h-[150px] w-[150px] rounded-2xl	"
                src="/xverse.png"
                alt="unisat"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModal;
