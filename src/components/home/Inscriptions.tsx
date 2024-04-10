import { useContext, useEffect, useState } from "react";
import { InscriptionProps } from "~/constants/interface";
import { WalletConnectContext } from "~/provider/WalletProvider";

const Inscription = ({ data }: InscriptionProps) => {
  const [isFav, setIsFav] = useState(false);
  const [input, setInput] = useState("");
  const { setLocalStorageData, address, addressInfo } =
    useContext(WalletConnectContext);
  const handleFav = () => {
    const _favStatus = !isFav;
    setLocalStorageData(addressInfo[0].address, {
      address: data.id,
      fav: _favStatus,
      name: input,
    });
    setIsFav(_favStatus);
  };

  const handleUpdateLocalStorage = (e: any) => {
    setInput(e.target.value);
    setLocalStorageData(addressInfo[0].address, {
      address: data.id,
      fav: isFav,
      name: e.target.value,
    });
  };

  const init = () => {
    const _storageData = localStorage.getItem(addressInfo[0].address);
    if (_storageData && _storageData?.length > 0) {
      const getLocalStorageData = JSON.parse(_storageData);
      getLocalStorageData.forEach((element: any) => {
        if (element.id === data.id) {
          setIsFav(element.fav);
          setInput(element.name);
        }
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex w-full border-black border-red-100 bg-slate-300 p-3 text-center">
      <div className="h-[30px] w-[30px] justify-end" onClick={handleFav}>
        {isFav === false && <img src={"fav_list.png"} alt="" />}
        {isFav === true && <img src={"fav.png"} alt="" />}
      </div>
      <div className="ml-2 flex flex-1 justify-start">
        {data.id.slice(0, 10) + "..." + data.id.slice(-5)}
      </div>
      <div className="flex-1">{data.p}</div>
      <div className="flex-1">{data.op}</div>
      <div className="flex-1">
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={input}
          onChange={handleUpdateLocalStorage}
        />
      </div>
    </div>
  );
};

export default Inscription;
