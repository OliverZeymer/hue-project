import axios from "axios"
import { useContext, useEffect, useState } from "react"
import LampNumberContext from "../contexts/LampNumberContext"

//Write a description for a business where you can control your phillips hue lights and lamps

const BrightnessSlider = () => {
  const [brightness, setBrightness] = useState(100)
  const { lampNumber } = useContext(LampNumberContext)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/${lampNumber}`)
      .then((response) => {
        setBrightness(Math.round(response.data.state.bri / 2.54))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [lampNumber])

  const handleChange = (event) => {
    setBrightness(event.target.value)
    axios
      .put(
        `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/${lampNumber}/state`,
        {
          bri: Math.round(event.target.value * 2.54),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="brightness-slider">
      <h2 className="text-center text-xl">Brightness: {brightness}%</h2>
      <input
        onInput={handleChange}
        value={brightness}
        aria-label="brightness slider"
        type="range"
        min="0"
        max="100"
        className="slider"
        id="myRange"
      />
    </div>
  )
}

export default BrightnessSlider
