import './App.css';
import { FaRegHandPaper, FaRegHandRock, FaRegHandScissors, FaRegQuestionCircle, FaTimes } from "react-icons/fa"

function App() {
  return (
    <div className="App bg-gradient-to-br from-[#f19700] to-[#c60022] min-h-screen font-roboto text-gray-50 flex justify-center">
      <div className="flex flex-col items-center max-w-7xl">
        <h1 className="text-4xl mt-2">Paper Rock Scissors Game</h1>
        <div className='flex justify-between w-full text-xl mt-4'>
          <span>Player Name</span>
          <span>Computer</span>
        </div>
        <div className='flex justify-between w-full text-4xl font-bold mt-4'>
          <span>0</span>
          <span>0</span>
        </div>
      <div className='flex w-full text-4xl items-center mt-8'>
        <div id="player" className='w-full flex flex-col items-center gap-6'>
          <FaRegHandPaper />
          <FaRegHandRock />
          <FaRegHandScissors />
        </div>
        <div id="versus" className='text-red-300 font-bold text-6xl'><FaTimes /></div>
        <div id="computer" className='w-full flex justify-center'><FaRegQuestionCircle /></div>
      </div>
      </div>
    </div>
  );
}

export default App;
