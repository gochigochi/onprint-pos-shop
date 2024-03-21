import { Dispatch, SetStateAction, useEffect, useState } from "react"
import type { CartProduct, Product } from "../../types"

type PropsTypes = {
    cart: CartProduct[]
    setCart: Dispatch<SetStateAction<CartProduct[]>>
}

const ProductsList = ({ cart, setCart }: PropsTypes) => {

    const [products, setProducts] = useState<Product[]>([])
    const baseUrl = import.meta.env.DEV ? import.meta.env.VITE_STORE_BASE_URL : import.meta.env.VITE_STORE_BASE_URL
    const ck = import.meta.env.DEV ? import.meta.env.VITE_WOO_CONSUMER_KEY : import.meta.env.VITE_WOO_CONSUMER_KEY
    const cs = import.meta.env.DEV ? import.meta.env.VITE_WOO_SECRET_KEY : import.meta.env.VITE_WOO_SECRET_KEY
    const url = `${baseUrl}products?per_page=10&consumer_key=${ck}&consumer_secret=${cs}`

    // GET PRODUCTS
    useEffect(() => {

        const getData = async () => {

            console.log(url)
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

    // ADD TO CART    
    const handleAdd = async (product: Product) => {

        setCart([...cart, {...product, qty: 1}])

    }

    return (
        <div className="w-full">
            <div className="mb-4">
                <h1 className="text-2xl">Products</h1>
            </div>
            <div className="grid grid-cols-12 gap-2">
                {
                    products.length !== 0 ?
                        products.map(product => (
                            <article key={product.id} className="col-span-6 sm:col-span-4 lg:col-span-3 h-60 border border-zinc-100 rounded-lg p-2 flex flex-col">
                                <img src={product.images[0].src} className="w-full h-24 object-cover rounded-md" />
                                <div className="p-1 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3>{product.name}</h3>
                                        <p>CHF.{product.price}</p>
                                    </div>
                                    <button onClick={() => handleAdd(product)} className="bg-zinc-100 rounded-sm px-2 py-1 text-slate-900 grid place-items-center" type="button">Add</button>
                                </div>
                            </article>
                        )) : null
                }
            </div>
        </div>
    )
}

export default ProductsList