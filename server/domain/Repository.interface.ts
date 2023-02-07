export default interface IRepository<T, Y> {
    findById: (id: string) => Promise<T>
    save: (data: T) => Promise<T>
}