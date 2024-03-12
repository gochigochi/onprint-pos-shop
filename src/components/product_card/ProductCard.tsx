import { useState } from "react"
import type { Product } from "../../types"

type PropsTypes = {
  product: Product
}

const ProductCard = ({ product }: PropsTypes) => {

  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.DEV ? import.meta.env.VITE_STORE_BASE_URL_DEV : import.meta.env.VITE_STORE_BASE_URL_DEV
  const ck = import.meta.env.DEV ? import.meta.env.VITE_WOO_CONSUMER_KEY : import.meta.env.VITE_WOO_CONSUMER_KEY
  const cs = import.meta.env.DEV ? import.meta.env.VITE_WOO_SECRET_KEY : import.meta.env.VITE_WOO_SECRET_KEY
  const apiUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-order" : "https://onprintpos.diegoui.com.ar/api/new-order"


  const handleAdd = async (id: Product["id"]) => {
    console.log(id)

    setLoading(true)

    //CREATE WOO ORDER
    const url = `${baseUrl}orders`
    const auth = btoa(`${ck}:${cs}`)

    const data = {
      payment_method: 'bacs',
      payment_method_title: 'Direct Bank Transfer',
      set_paid: true,
      billing: {
        first_name: 'John',
        last_name: 'Doe',
        address_1: '969 Market',
        address_2: '',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US',
        email: 'john.doe@example.com',
        phone: '(555) 555-5555',
      },
      shipping: {
        first_name: 'Takeaway',
        last_name: 'Doe',
        address_1: '969 Market',
        address_2: '',
        city: 'San Francisco',
        state: 'CA',
        postcode: '94103',
        country: 'US',
      },
      line_items: [
        {
          product_id: id,
          quantity: 1,
        },
      ],
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: '10.00',
        },
      ],
    };

    try {

      const wooResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(data),
      })

      const result = await wooResponse.json()

      console.log("WOO REPSPONE....", result)

      const apiPostData = {
        products: [
          { id: 1, name: "Product 1", price: 200 },
          { id: 2, name: "Product 2", price: 220 },
          { id: 3, name: "Product 3", price: 230 },
        ]
      }

      const apiPostOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPostData)
      }

      const response = await fetch(apiUrl, apiPostOptions)

      console.log("API POST RESULT....", response)


    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)
      
    }
  }


  return (
    <article key={product.id} className="col-span-6 sm:col-span-4 lg:col-span-3 h-60 border border-zinc-100 rounded-lg p-2 flex flex-col">
      <img src={product.images[0].src} className="w-full h-24 object-cover rounded-md" />
      <div className="p-1 flex flex-col flex-1 justify-between">
        <div>
          <h3>{product.name}</h3>
          <p>CHF.{product.price}</p>
        </div>
        <button onClick={() => handleAdd(product.id)} className="bg-zinc-100 rounded-sm px-2 py-1 text-slate-900 grid place-items-center" type="button">
          {
            loading ?
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-zinc-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> :
              "Add"
          }
        </button>
      </div>
    </article>
  )
}

export default ProductCard