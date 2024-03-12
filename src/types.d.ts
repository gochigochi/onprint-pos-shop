export type Product = {
    id: number
    name: string
    price: string
    images: ProductImage[]
}

type ProductImage = {
    id: number
    src: string
    alt: string
}