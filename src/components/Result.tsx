import { ReactElement } from "react";

interface ResultProps {
  result?: string,
  children: ReactElement,
  onClick: () => void
}

function Result({result, children, onClick}: ResultProps) {
  return <>
    <div className='my-12 text-4xl'>{result || "Chose your hand"}</div>
    {children}
    {result ? <div
      className='my-12 text-4xl border bg-white text-orange-600 rounded-md py-2 px-4 cursor-pointer'
      onClick={onClick}
    >
      Play again
    </div> : null}
  </>
}

export default Result;
