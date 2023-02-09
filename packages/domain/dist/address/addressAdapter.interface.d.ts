import Address from "./address.model.ts";
export declare type IAddressAdapter = {
    saveAddress(data: Address): Promise<Address>;
    getAddress(id: string): Promise<Address>;
};
