import Address from "../../domain/address/address.model.ts";
import IAddressAdapter from "../../domain/address/addressAdapter.interface.ts";
import AddressRepository from "./address.repository.ts";

export default class AddressAdapter implements IAddressAdapter {

    constructor(private repo: AddressRepository) {}
    async getAddress(id: string): Promise<Address> {
        const entity = await this.repo.findById(id);

        return new Address(entity);
    }

    async saveAddress(data: Address): Promise<Address> {
        const entity = await this.repo.save(data);

        return new Address(entity)
    }
}