import { useId, useRef } from "react"

const ProductCustomizer = () => {

    const formId = useId()
    const radioId = useId()
    const textAreaHintId = useId()
    const formRef = useRef<HTMLFormElement | null>(null)
    const textRef = useRef<HTMLTextAreaElement | null>(null)
    const radioRef = useRef<string | null>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //SEND DATA TO SERVER
        console.log(textRef.current?.value, radioRef.current)

        if (formRef.current) formRef.current.reset()
    }

    return (
        <div className="max-w-md mx-auto">
            <form
                onSubmit={handleSubmit}
                ref={formRef}
                id={formId}
                className="flex flex-col gap-2"
            >
                {/* ENVIO */}
                <fieldset form={formId}>
                    <legend>Seleccione tipo de pedido</legend>
                    <input
                        type="radio"
                        id={radioId + "-delivery"}
                        value="delivery"
                        name="order-type"
                        onChange={(e) => radioRef.current = e.target.value}
                    />
                    <label htmlFor={radioId + "-delivery"}>Delivery</label>
                    <input
                        type="radio"
                        id={radioId + "-onsite"}
                        value="onsite"
                        name="order-type"
                        onChange={(e) => radioRef.current = e.target.value}
                    />
                    <label htmlFor={radioId + "-onsite"}>En el local</label>
                </fieldset>

                {/* NOTA */}
                <label htmlFor="text-area">Notas adicionales</label>
                <textarea
                    id="text-area"
                    role="textbox"
                    name="notas"
                    ref={textRef}
                    aria-describedby={textAreaHintId}
                    className="text-zinc-900"
                />
                <p id={textAreaHintId} className="hidden">Agregue notas adicionales sobre su producto o envío</p>
                <button type="submit">Agregar</button>
            </form>
        </div>
    )
}

export default ProductCustomizer