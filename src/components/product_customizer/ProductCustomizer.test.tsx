import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCustomizer from "./ProductCustomizer"

describe("user can use the product customizer", () => {


    // it("can be navigated with tab", async () => {



    // })

    it("can write in textarea and textarea is resetted after submit", async () => {

        const user = userEvent.setup()
        
        render(<ProductCustomizer />)
        
        const textArea = screen.getByRole("textbox", { name: /notas/i })
        const submit = screen.getByRole("button", { name: /agregar/i })

        await user.type(textArea, "test message")

        expect(textArea).toHaveValue("test message")

        await user.click(submit)

        expect(textArea).toHaveValue("")

    })
})