import { useEffect, useLayoutEffect, useRef } from 'react'

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}


export function shorten(str:string, len:number) {
  if(str.length > len) {
    return str.substring(0, len/2+1) + ".." + str.substring(str.length-len/2+1, str.length);
  }
  return str;
}

export default useInterval