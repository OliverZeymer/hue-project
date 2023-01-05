import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { IoBulbOutline, IoBulb } from "react-icons/io5"
import ColorLoopContext from "../contexts/ColorLoopContext"
import LampNumberContext from "../contexts/LampNumberContext"

const LightSwitchButton = () => {
  const [state, setState] = useState()
  const { colorLoop, setColorLoop } = useContext(ColorLoopContext)
  const { lampNumber } = useContext(LampNumberContext)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/${lampNumber}`)
      .then((response) => {
        setState(response.data.state.on ? "on" : "off")
      })
      .catch((error) => {
        console.log(error)
      })
  }, [state, lampNumber])

  const lampHandler = () => {
    setColorLoop("off")
    axios
      .put(
        `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/${lampNumber}/state`,
        {
          on: state === "on" ? false : true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setState(response.data[0].success[`/lights/${lampNumber}/state/on`] ? "on" : "off")
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      {state === "on" ? <IoBulb size={50} /> : <IoBulbOutline size={50} />}
      <button className="rounded-full uppercase px-6 py-3 text-2xl font-semibold border-white border-2" onClick={lampHandler}>
        Lamp: {state}
      </button>
    </>
  )
}

export default LightSwitchButton
