import Address from "./address.model.ts";

export default interface IAddressAdapter {
    saveAddress(data: Address): Promise<Address>
    getAddress(id: string): Promise<Address>
}