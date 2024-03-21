import { useState } from "react";
import Layout from "./components/layout/Layout";
import ProductsList from "./components/products_list/ProductsList";
import { CartProduct } from "./types";

function App() {

  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState<CartProduct[]>([])
  const total = cart.reduce((acc, curr) => acc + Number(curr.price), 0)
  const newOrderUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-order" : "https://onprintpos.diegoui.com.ar/api/new-order"

  const handleCheckout = async () => {

    setLoading(true)

    
    const parsedCart = cart.map(product => ({ product_id: product.id, quantity: product.qty }))
    console.log("CHECKOUT.....", parsedCart )

    try {

      console.log("CART....", cart)
      const data = {
        customer: "Diego",
        payment_method: "Bank Transfer / Cash",
        address: "Street 123",
        city: "Buenos Aires",
        postcode: "1661",
        country: "Argentina",
        email: "diegoeliseoiovane@gmail.com",
        phone: "54043433",
        service: "Takeaway / Delivery",
        products: parsedCart, 
        storeId: 1, // define printer
      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }

      const response = await fetch(newOrderUrl, options)

      const result = await response.json()

      console.log("API POST RESULT....", result)

      if (!response.ok) {
        throw new Error("Ocurrió un error creando una nueva orden")
      }

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)

    }
  }

  return (
    <Layout>
      <div className="grid grid-cols-12 p-4 max-w-screen-xl mx-auto gap-4">
        <div className="col-span-6">
          <ProductsList cart={cart} setCart={setCart} />
        </div>
        <div className="col-span-6 bg-white border-l border-l-zinc-200 px-4">
          <div className="flex flex-col sticky top-4 h-80">
            <h2 className="text-xl">Cart</h2>
            <div className="flex-1 overflow-auto">
              {
                cart.length !== 0 ?
                  cart.map(item => {
                    return (
                      <div key={item.id + `${crypto.randomUUID()}`} className="flex justify-between">
                        <div>1 {item.name}</div>
                        <div>CHF. {item.price}</div>
                      </div>
                    )
                  }) : null
              }
            </div>
            <div className="flex justify-between">
              <div>Total:</div>
              <div>CHF. {total}</div>
            </div>
            <div className="grid grid-cols-12 gap-2 p-4">
              <button
                onClick={() => setCart([])}
                className="ghost-button col-span-4 disabled:opacity-50 disabled:hover:bg-zinc-300"
                disabled={loading}
              >Clear</button>
              <button
                className="primary-button col-span-8 disabled:opacity-50 disabled:hover:bg-green-500"
                onClick={handleCheckout}
                disabled={loading}
              >
                {
                  loading ?
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-zinc-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> :
                    "Checkout"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
