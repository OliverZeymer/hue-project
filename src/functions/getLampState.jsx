import axios from "axios"
import { useState } from "react"
export default function getLampState() {
  const [isOn, setIsOn] = useState()
  axios
    .get(`${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/27`)
    .then((response) => {
      setIsOn(response.data.state.on ? "on" : "off")
    })
    .catch((error) => {
      console.log(error)
    })
  return isOn
}
