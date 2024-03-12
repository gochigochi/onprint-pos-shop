import { useState } from "react"
import type { Product } from "../../types"

type PropsTypes = {
  product: Product
}

const ProductCard = ({ product }: PropsTypes) => {

  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.DEV ? import.meta.env.VITE_STORE_BASE_URL_DEV : import.meta.env.VITE_STORE_BASE_URL_DEV


  const handleAdd = (id: Product["id"]) => {
    console.log(id)

    setLoading(true)

    //CREATE WOO ORDER

    const url = `${baseUrl}orders`

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

    const auth = btoa(`ck_b8d76a1632102fa3b8207870efc42c64fd1c7b90:cs_5f71cf1f6eca0f63951d91771f4d295a67cbe40e`)

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Response:', result);

            fetch("https://onprintpos.diegoui.com.ar/api/new-order")
            .then(res => {
              console.log("Success")
              console.log(res)
            })
            .catch(err => console.log(err))


            // fetch("http://localhost:8080/api/new-order")
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err))


        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
          setLoading(false)
        })
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