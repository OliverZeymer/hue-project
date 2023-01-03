import useLamp from "../hooks/useLamp"

const Button = () => {
  const { loading, data } = useLamp(
    `${import.meta.env.VITE_HUE_BRIDGE_IP}/api/${import.meta.env.VITE_HUE_USERNAME}/lights/${import.meta.env.VITE_HUE_LIGHT_ID}`
  )
  return (
    <button
      onClick={() => {
        if (!loading) console.log(data)
      }}
      className="btn btn-primary">
      Click me
    </button>
  )
}

export default Button
