import { render, screen } from "@testing-library/react"
import Score from "./Score"

describe("Hand component Tests", () => {
  const testProps = {
    playerName:"TestPlayer",
    playerScore:0,
    computerScore:0
  }
  test("It should render the name of the player", () => {
    render(<Score {...testProps} />)
    expect(screen.getByText(testProps.playerName)).toHaveTextContent(testProps.playerName)
  })

  test("It should render the score of both players", () => {
    const {rerender} =  render(<Score {...testProps} />)
    expect(screen.getByTestId("player-score")).toHaveTextContent("0")
    expect(screen.getByTestId("computer-score")).toHaveTextContent("0")

    rerender(<Score {...testProps} playerScore={2} computerScore={3} />)
    expect(screen.getByTestId("player-score")).toHaveTextContent("2")
    expect(screen.getByTestId("computer-score")).toHaveTextContent("3")
  })
})