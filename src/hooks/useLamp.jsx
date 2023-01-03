//create a custom hook to use the lamp
import { useEffect, useState } from "react"
import axios from "axios"

export default function useLamp(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        const response = await axios.get(url)
        setData(response.data.state)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [url])
  return { data, error, loading }
}
