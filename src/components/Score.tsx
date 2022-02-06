interface ScoreProps {
  playerScore: number,
  computerScore: number,
  playerName: string,
  computerName?: string
}

function Score(props: ScoreProps) {
  return <>
    <div className='flex justify-between w-full text-xl mt-4'>
          <span>{props.playerName}</span>
          <span>{props.computerName || "Computer"}</span>
        </div>
        <div className='flex justify-between w-full text-4xl font-bold mt-4'>
          <span data-testid="player-score">{props.playerScore}</span>
          <span data-testid="computer-score">{props.computerScore}</span>
        </div>
  </>;
}

export default Score;
