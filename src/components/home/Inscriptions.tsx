import { useState } from "react";
import { InscriptionProps } from "~/constants/interface";

const Inscription = ({ data }: InscriptionProps) => {
  console.log("inscription data = ", data);
  const [isFav, setIsFav] = useState(false);
  const handleFav = () => {
    const _favStatus = !isFav;
    setIsFav(_favStatus);
  };
  return (
    <div className="flex w-full border-black border-red-100 bg-slate-300 p-3 text-center">
      <div className="h-[30px] w-[30px] justify-end" onClick={handleFav}>
        {isFav === false && <img src={"fav_list.png"} alt="" />}
        {isFav === true && <img src={"fav.png"} alt="" />}
      </div>
      <div className="ml-2 flex flex-1 justify-start">
        {(data.inscriptionId ? data.inscriptionId : data.id).slice(0, 10) +
          "..." +
          (data.inscriptionId ? data.inscriptionId : data.id).slice(-5)}
      </div>
      <div className="flex-1">{data.output}</div>
      <div className="flex-1">{data.timestamp}</div>
    </div>
  );
};

export default Inscription;
