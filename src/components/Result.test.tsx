import { fireEvent, render, screen } from "@testing-library/react"
import Result from "./Result"

describe("Result component Tests", () => {
  test("It should render message asking to chose", () => {
    const click = jest.fn()
    const {container} = render(<Result onClick={click}><></></Result>)
    expect(container).toHaveTextContent("Chose your hand")
  })

  test("It should render message with the result and hide the original message", () => {
    const click = jest.fn()
    const {container} = render(<Result result="Player wins" onClick={click}><></></Result>)
    expect(container).not.toHaveTextContent("Chose your hand")
    expect(container).toHaveTextContent("Player wins")
  })

  test("It should show a button to player again, and clicking the button should execute the function", () => {
    const click = jest.fn()
    render(<Result result="Player wins" onClick={click}><></></Result>)
    fireEvent.click(screen.getByText("Play again"))
    expect(click).toHaveBeenCalled()
  })

  test("It should not show a button to player again, if the game doesn't have a result", () => {
    const click = jest.fn()
    render(<Result onClick={click}><></></Result>)
    expect(screen.queryByText("Play again")).not.toBeInTheDocument()
  })

})