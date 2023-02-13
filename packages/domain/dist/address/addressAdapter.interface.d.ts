import Address from "./address.model.ts";
export type IAddressAdapter = {
    saveAddress(data: Address): Promise<Address>;
    getAddress(id: string): Promise<Address>;
};
