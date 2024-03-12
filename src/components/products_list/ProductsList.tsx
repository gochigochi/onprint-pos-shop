import { useEffect, useState } from "react"
import type { Product } from "../../types"
import ProductCard from "../product_card/ProductCard"

const ProductsList = () => {

    const [products, setProducts] = useState<Product[]>([])
    const baseUrl = import.meta.env.DEV ? import.meta.env.VITE_STORE_BASE_URL_DEV : import.meta.env.VITE_STORE_BASE_URL_DEV
    const ck = import.meta.env.DEV ? import.meta.env.VITE_WOO_CONSUMER_KEY : import.meta.env.VITE_WOO_CONSUMER_KEY
    const cs = import.meta.env.DEV ? import.meta.env.VITE_WOO_SECRET_KEY : import.meta.env.VITE_WOO_SECRET_KEY
    const url = `${baseUrl}products?per_page=10&consumer_key=${ck}&consumer_secret=${cs}`

    useEffect(() => {

        const getData = async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setProducts(json)

            } catch (err) {
                console.log("Error fetching data: ", err)
            }
        }

        getData()

    }, [url])

    return (
        <div className="p-2">
            <div className="mb-4">
                <h1 className="text-2xl">Products</h1>
            </div>
            <div className="grid grid-cols-12 gap-2">
                {
                    products.length !== 0 ?
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        )) : null
                }
            </div>
        </div>
    )
}

export default ProductsList