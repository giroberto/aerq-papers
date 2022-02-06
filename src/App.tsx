import './App.css';
import { FaTimes } from "react-icons/fa"
import { useEffect, useState } from 'react';
import Hand from './components/Hand';

interface GameState {
  playerHand?: string,
  computerHand?: string,
  playerScore: number,
  computerScore: number,
  result?: string
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    playerScore: 0,
    computerScore: 0
  });

  useEffect(() => {
    function setResult(text: string) {
      let {playerScore, computerScore} = gameState
      if (text === "Player Wins")
        playerScore++;
      if (text === "Computer Wins")
        computerScore++;
      setGameState({
        ...gameState,
        result: text,
        playerScore,
        computerScore
      })
    }

    if (gameState.playerHand && gameState.computerHand) {
      setResult(computeWinner(gameState.playerHand, gameState.computerHand))
    }
  }, [gameState.playerHand, gameState.computerHand]);

  function setComputerHand() {
    const options = [
      "Paper",
      "Rock",
      "Scissors"
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  function setPlayerHand(playerHand: string) {
    setGameState({
      ...gameState,
      playerHand,
      computerHand: setComputerHand()
    })
  }

  function computeWinner(playerHand: string, computerHand: string) {
    if (
      (playerHand === "Rock" && computerHand === "Paper") ||
      (playerHand === "Paper" && computerHand === "Scissors") ||
      (playerHand === "Scissors" && computerHand === "Rock")
    ) {
      return "Player Wins"
    }
    if (
      (computerHand === "Rock" && playerHand === "Paper") ||
      (computerHand === "Paper" && playerHand === "Scissors") ||
      (computerHand === "Scissors" && playerHand === "Rock")
    ) {

      return "Computer Wins"
    }
    return "Draw"
  }

  function clearHands() {
    setGameState({
      ...gameState,
      computerHand: undefined,
      playerHand: undefined,
      result: undefined
    })
  }

  function renderPlayerHands() {
    return <>
      {[undefined, "Paper"].includes(gameState.playerHand) && <Hand selected='Paper' onClick={() => setPlayerHand("Paper")} />}
      {[undefined, "Rock"].includes(gameState.playerHand) && <Hand selected='Rock' onClick={() => setPlayerHand("Rock")} />}
      {[undefined, "Scissors"].includes(gameState.playerHand) && <Hand selected='Scissors' onClick={() => setPlayerHand("Scissors")} />}
    </>
  }

  return (
    <div className="App bg-gradient-to-br from-[#f19700] to-[#c60022] min-h-screen font-roboto text-gray-50 flex justify-center">
      <div className="flex flex-col items-center max-w-7xl">
        <h1 className="text-4xl mt-2">Paper Rock Scissors</h1>
        <div className='flex justify-between w-full text-xl mt-4'>
          <span>Player Name</span>
          <span>Computer</span>
        </div>
        <div className='flex justify-between w-full text-4xl font-bold mt-4'>
          <span>{gameState.playerScore}</span>
          <span>{gameState.computerScore}</span>
        </div>

        <div className='my-12 text-4xl'>{gameState.result || "Chose your hand"}</div>
        <div className='flex w-full text-6xl items-center'>
          <div id="player" className='w-full flex flex-col items-center gap-6'>
            {renderPlayerHands()}
          </div>
          <div id="versus" className='text-red-300 font-bold text-6xl' ><FaTimes /></div>
          <div id="computer" className='w-full flex justify-center'><Hand selected={gameState.computerHand} rightToLeft /></div>
        </div>
        {
          gameState.result &&
          <div
            className='my-12 text-4xl border bg-white text-orange-600 rounded-md py-2 px-4 cursor-pointer'
            onClick={() => clearHands()}
          >
            Play again
          </div>
        }

      </div>
    </div>
  );
}

export default App;
