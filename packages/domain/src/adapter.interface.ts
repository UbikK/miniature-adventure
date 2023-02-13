export type IAdapter<T> = {
    toDto: (model: T) => any
}