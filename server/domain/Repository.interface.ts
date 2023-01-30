export default interface IRepository<T, Y> {
    getById: (id: string) => Promise<T>
    save: (data: T) => Promise<T>
    convertToDomain: (data: T) => Y
}