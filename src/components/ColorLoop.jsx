import { TiWaves } from "react-icons/ti"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import ColorLoopContext from "../contexts/ColorLoopContext"

const ColorLoop = () => {
  const { colorLoop, setColorLoop } = useContext(ColorLoopContext)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/27`)
      .then((response) => {
        console.log(response)
        setColorLoop(response.data.state.effect === "colorloop" ? "on" : "off")
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const lampHandler = () => {
    axios
      .put(
        `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/27/state`,
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
        setColorLoop(response.data[0].success["/lights/27/state/effect"] === "none" ? "off" : "on")
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
