import { useState } from "react"

const CheckoutForm = ({ cart, setCheckout }) => {

    const [loading, setLoading] = useState(false)
    const [customerData, setCustomerData] = useState({
        customer: "",
        address: "",
        postcode: "",
        city: "",
        country: "",
        phone: "",
        email: "",
    })
    const newOrderUrl = import.meta.env.DEV ? "http://localhost:8080/api/new-order" : "https://onprintpos.diegoui.com.ar/api/new-order"

    const handleCheckout = async (e) => {
        e.preventDefault()
        console.log(customerData)

        setLoading(true)


        const parsedCart = cart.map(product => ({ product_id: product.id, quantity: product.qty }))
        console.log("CHECKOUT.....", parsedCart)

        try {

            console.log("CART....", cart)
            const data = {
                customer: customerData.customer,
                payment_method: "Bank Transfer / Cash",
                address: customerData.address,
                city: customerData.city,
                postcode: customerData.postcode,
                country: customerData.country,
                email: customerData.email,
                phone: customerData.phone,
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
        <div className="fixed inset-0 bg-slate-900/50 grid place-items-center z-50 p-4">
            <form className="relative bg-white p-12 rounded-md flex flex-col gap-5 w-full max-w-xl">
                <input onChange={(e) => setCustomerData({ ...customerData, customer: e.target.value})} type="text" placeholder="Name" />
                <input onChange={(e) => setCustomerData({ ...customerData, address: e.target.value})} type="text" placeholder="Address" />
                <input onChange={(e) => setCustomerData({ ...customerData, postcode: e.target.value})} type="text" placeholder="Postcode" />
                <input onChange={(e) => setCustomerData({ ...customerData, city: e.target.value})} type="text" placeholder="City" />
                <input onChange={(e) => setCustomerData({ ...customerData, country: e.target.value})} type="text" placeholder="Country" />
                <div className="grid grid-cols-12 gap-1">
                    <button onClick={() => setCheckout(false)} className="ghost-button col-span-4">Cancel</button>
                    <button onClick={handleCheckout} className="primary-button col-span-8">
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
            </form>
        </div>
    )
}

export default CheckoutForm