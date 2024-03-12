import { render } from "@testing-library/react"
import ProductsList from "./ProductsList"

describe("shows products list", () => {

    it("renders the list of products", () => {
        render(<ProductsList />)
    })
})