export interface Address {
  id: string;
  name: string;
  address: string;
  isDefault?: boolean;
}

export interface AddressState {
  list: Address[];
}
