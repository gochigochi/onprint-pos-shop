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

export type CartProduct = Product & { qty: number }

export type Cart = { 
    products: CartProduct[] 
    total: string
}