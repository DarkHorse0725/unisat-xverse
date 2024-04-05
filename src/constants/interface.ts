export interface walletConnectProps {
  address: string;
  isConnected: boolean;
  openModal: boolean;
  walletType: string;
  setOpenModal: () => void;
  connectWallet: () => void;
}
export declare enum AddressPurpose {
  Ordinals = "ordinals",
  Payment = "payment",
  Stacks = "stacks",
}

export declare enum AddressType {
  p2pkh = "p2pkh",
  p2sh = "p2sh",
  p2wpkh = "p2wpkh",
  p2wsh = "p2wsh",
  p2tr = "p2tr",
  stacks = "stacks",
}

export interface Address {
  address: string;
  publicKey: string;
  purpose: AddressPurpose;
  addressType?: AddressType;
}

export interface InscriptionProps {
  data: any;
}
