import { useEffect, useState } from "react";

export const usePageLoaded = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(
    () => document.readyState === "complete"
  )

  useEffect(() => {
    const handlePageLoad = () => {
      setIsPageLoaded(true)
    }

    if (document.readyState === "complete") {
      handlePageLoad()
      return
    }

    window.addEventListener("load", handlePageLoad)

    return () => {
      window.removeEventListener("load", handlePageLoad)
    }
  }, [])

  return isPageLoaded
}
