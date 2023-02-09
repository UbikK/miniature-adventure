import Address from "./address.model";

export type IAddressAdapter = {
    saveAddress(data: Address): Promise<Address>
    getAddress(id: string): Promise<Address>
}