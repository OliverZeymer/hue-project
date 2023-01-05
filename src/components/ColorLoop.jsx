import { TiWaves } from "react-icons/ti"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import ColorLoopContext from "../contexts/ColorLoopContext"
import LampNumberContext from "../contexts/LampNumberContext"

const ColorLoop = () => {
  const { colorLoop, setColorLoop } = useContext(ColorLoopContext)
  const { lampNumber } = useContext(LampNumberContext)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/${lampNumber}`)
      .then((response) => {
        console.log(response)
        setColorLoop(response.data.state.effect === "colorloop" ? "on" : "off")
      })
      .catch((error) => {
        console.log(error)
      })
  }, [lampNumber])

  const lampHandler = () => {
    axios
      .put(
        `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/${lampNumber}/state`,
        {
          effect: colorLoop === "off" ? "colorloop" : "none",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setColorLoop(response.data[0].success[`/lights/${lampNumber}/state/effect`] === "none" ? "off" : "on")
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <button
      className={
        colorLoop === "on"
          ? "rounded-full uppercase px-6 py-3 text-2xl border-white border-2 flex items-center font-semibold rainbow-button"
          : "rounded-full uppercase px-6 py-3 text-2xl border-white border-2 flex items-center font-semibold"
      }
      onClick={lampHandler}>
      {colorLoop === "on" ? "Disable" : "Enable"} Colorloop <TiWaves size={40} />
    </button>
  )
}

export default ColorLoop
