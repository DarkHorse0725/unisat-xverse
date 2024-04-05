import { InscriptionProps } from "~/constants/interface";

const Inscription = ({ data }: InscriptionProps) => {
  console.log("inscription data = ", data);
  return (
    <div className="flex w-full border-black border-red-100 bg-slate-300 p-3 text-center">
      <div className="flex-1">{data.inscriptionId}</div>
      <div className="flex-1">{data.outputValue}</div>
      <div className="flex-1">{data.timestamp}</div>
    </div>
  );
};

export default Inscription;
