import {FaRegHandPaper, FaRegHandRock, FaRegHandScissors, FaRegQuestionCircle} from "react-icons/fa"

interface HandInterface{
  selected?: string,
  onClick?: () => void,
  rightToLeft?: boolean
}

function Hand({selected, onClick, rightToLeft}: HandInterface) {
  if(!selected)
    return <FaRegQuestionCircle />
  if(selected === "Paper")
    return <FaRegHandPaper  className={rightToLeft ? "-rotate-90 -scale-x-100": "rotate-90"} onClick={onClick}/>
  if(selected === "Rock")
    return <FaRegHandRock className={rightToLeft ? "-rotate-90 -scale-x-100": "rotate-90"} onClick={onClick}/>
  if(selected === "Scissors")
    return <FaRegHandScissors className={rightToLeft ? "" : "-scale-x-100"} onClick={onClick} />
  return <span onClick={onClick}>{selected}</span>;
}

export default Hand;
