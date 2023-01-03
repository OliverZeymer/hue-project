import axios from "axios"
import { useEffect, useState } from "react"

const BrightnessSlider = () => {
  const [brightness, setBrightness] = useState(100)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/27`)
      .then((response) => {
        setBrightness(Math.round(response.data.state.bri / 2.54))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleChange = (event) => {
    setBrightness(event.target.value)
    axios
      .put(
        `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/27/state`,
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
