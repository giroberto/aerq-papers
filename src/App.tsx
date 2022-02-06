import './App.css';
import { FaTimes } from "react-icons/fa"
import { ReactElement, useEffect, useState } from 'react';
import Hand from './components/Hand';
import Score from './components/Score';
import Result from './components/Result';

interface GameState {
  playerName: string
  playerHand?: string,
  computerHand?: string,
  playerScore: number,
  computerScore: number,
  computerMode: boolean,
  result?: string
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    playerName: "Player",
    playerScore: 0,
    computerScore: 0,
    computerMode: false
  });

  const rules: { [key: string]: { wins: string[], component: ReactElement } } = {
    Rock: { wins: ["Scissors"], component: <Hand selected='Rock' onClick={() => setPlayerHand("Rock")} /> },
    Scissors: { wins: ["Paper"], component: <Hand selected='Scissors' onClick={() => setPlayerHand("Scissors")} /> },
    Paper: { wins: ["Rock"], component: <Hand selected='Paper' onClick={() => setPlayerHand("Paper")} /> }
  }

  useEffect(() => {
    function setResult(text: string) {
      let { playerScore, computerScore } = gameState
      if (text === `${gameState.playerName} Wins`)
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

  function getRandomHand() {
    const hands = Object.keys(rules)
    return hands[Math.floor(Math.random() * hands.length)]
  }

  function setPlayerHand(playerHand: string) {
    setGameState({
      ...gameState,
      playerHand,
      computerHand: getRandomHand()
    })
  }

  function computeWinner(playerHand: string, computerHand: string) {
    if (rules[playerHand].wins.includes(computerHand)) {
      return `${gameState.playerName} Wins`
    }
    if (rules[computerHand].wins.includes(playerHand)) {
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

  function setComputerMode() {
    const computeMode = gameState.computerMode
    console.log(computeMode)
    setGameState({
      ...gameState,
      computerMode: !computeMode,
      playerName: !computeMode ? "Robot" : "Player"
    })
  }

  function renderPlayerHands() {
    if (gameState.playerHand)
      return rules[gameState.playerHand].component
    return <>
      {Object.values(rules).map(hand => hand.component)}
    </>
  }

  return (
    <div className="App select-none bg-gradient-to-br from-[#f19700] to-[#c60022] min-h-screen font-roboto text-gray-50 flex justify-center">
      <div className="flex flex-col items-center max-w-7xl">
        <h1 className="text-4xl mt-2">Paper Rock Scissors</h1>
        <Score playerScore={gameState.playerScore} computerScore={gameState.computerScore} playerName={gameState.playerName} />
        <Result onClick={clearHands} result={gameState.result}>
          <div className='flex w-full text-6xl items-center'>
            {gameState.computerMode
              ? <div id="computer1" className='w-full flex justify-center'>
                <Hand selected={gameState.playerHand} />
              </div>
              : <div id="player" className='w-full flex flex-col items-center gap-6'>
                {renderPlayerHands()}
              </div>
            }
            <div id="versus" className='text-red-300 font-bold text-6xl' >
              <FaTimes />
            </div>
            <div id="computer2" className='w-full flex justify-center'>
              <Hand selected={gameState.computerHand} rightToLeft />
            </div>
          </div>
        </Result>
        {(gameState.computerMode && !gameState.result) ? <div className='my-12 text-4xl border bg-white text-orange-600 rounded-md py-2 px-4 cursor-pointer select-none'
          onClick={() => setPlayerHand(getRandomHand())}
        >
          Play
        </div> : null}
        <span className='flex items-center text-xl mt-8'>
          <input className="m-2" type="checkbox" onChange={setComputerMode} checked={gameState.computerMode} />Computer vs Computer?
        </span>
      </div>
    </div>
  );
}

export default App;
