import { IAdapter } from "../adapter.interface.ts";
import Address from "./address.model.ts";

export interface IAddressAdapter extends IAdapter<Address> {
    saveAddress(data: Address): Promise<Address>
    getAddress(id: string): Promise<Address>
}