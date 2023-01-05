import { useContext } from "react"
import LampNumberContext from "../contexts/LampNumberContext"

const InputField = () => {
  const { setLampNumber } = useContext(LampNumberContext)
  function submitHandler(e) {
    e.preventDefault()
    const number = e.target[0].value
    console.log(e)
    setLampNumber(number)
  }
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-2 ">
      <input type="number" className="text-black rounded-2xl py-1 px-3 text-xl" />
      <input className="text-xl rounded-full py-2 px-6 border-2 cursor-pointer" type="submit" value="Submit your lamp number" />
    </form>
  )
}

export default InputField
