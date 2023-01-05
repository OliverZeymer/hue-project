import LightSwitchButton from "./components/LightSwitchButton"
import ColorPicker from "./components/ColorPicker"
import ColorLoop from "./components/ColorLoop"
import BrightnessSlider from "./components/BrightnessSlider"
import ColorContext from "./contexts/ColorContext"
import { useState } from "react"
import ColorLoopContext from "./contexts/ColorLoopContext"
import LampNumberContext from "./contexts/LampNumberContext"
import InputField from "./components/InputField"
function App() {
  const [color, setColor] = useState("#333")
  const [colorLoop, setColorLoop] = useState("off")
  const [lampNumber, setLampNumber] = useState()
  return (
    <ColorLoopContext.Provider value={{ colorLoop, setColorLoop }}>
      <ColorContext.Provider value={{ color, setColor }}>
        <LampNumberContext.Provider value={{ lampNumber, setLampNumber }}>
          <div
            className={colorLoop === "on" ? "text-white select-none rainbow-background" : "text-white select-none"}
            style={{ backgroundColor: color !== "#ffffff" ? color : "#333" }}>
            <div className="h-screen gap-8 flex flex-col items-center justify-center">
              <h1 className="text-5xl">Phillips Hue App</h1>
              <InputField />
              <LightSwitchButton />
              <ColorPicker />
              <ColorLoop />
              <BrightnessSlider />
            </div>
          </div>
        </LampNumberContext.Provider>
      </ColorContext.Provider>
    </ColorLoopContext.Provider>
  )
}

export default App
