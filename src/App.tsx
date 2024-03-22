import { useState } from "react";
import Layout from "./components/layout/Layout";
import ProductsList from "./components/products_list/ProductsList";
import { CartProduct } from "./types";
import CheckoutForm from "./components/checkout_form/CheckoutForm";

function App() {

  const [cart, setCart] = useState<CartProduct[]>([])
  const [isCheckout, setCheckout] = useState(false)
  const total = cart.reduce((acc, curr) => acc + Number(curr.price), 0)

  return (
    <Layout>
      <div className="grid grid-cols-12 p-4 max-w-screen-xl mx-auto gap-4">
        <div className="col-span-6">
          <ProductsList cart={cart} setCart={setCart} />
        </div>

        { isCheckout ? <CheckoutForm cart={cart} setCheckout={setCheckout} /> : null }

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
              disabled={cart.length === 0}
              >
                Clear
              </button>
              <button 
              onClick={() => setCheckout(true)} 
              className="primary-button col-span-8 disabled:opacity-50 disabled:hover:bg-green-500"
              disabled={cart.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
