import { SketchPicker } from "react-color"
import { useContext, useEffect } from "react"
import axios from "axios"
import ColorContext from "../contexts/ColorContext"
import hueXYBriToRgb from "../functions/hueXYBriToRgb"
import ColorLoopContext from "../contexts/ColorLoopContext"

const ColorPicker = () => {
  const { colorLoop, setColorLoop } = useContext(ColorLoopContext)
  const { color, setColor } = useContext(ColorContext)
  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component"
    return ((r << 16) | (g << 8) | b).toString(16)
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/27`)
      .then((response) => {
        setColor(
          "#" +
            rgbToHex(
              hueXYBriToRgb(response.data.state.xy[0], response.data.state.xy[1], response.data.state.bri).r,
              hueXYBriToRgb(response.data.state.xy[0], response.data.state.xy[1], response.data.state.bri).g,
              hueXYBriToRgb(response.data.state.xy[0], response.data.state.xy[1], response.data.state.bri).b
            )
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleChangeComplete = (color) => {
    setColor(color.hex)
    setColorLoop("off")
    axios
      .put(
        `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/27/state`,
        {
          hue: Math.round(color.hsl.h * 182.04),
          sat: Math.round(color.hsl.s * 254),
          effect: "none",
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

  return <SketchPicker color={color} width="400px" onChangeComplete={handleChangeComplete} />
}

export default ColorPicker
