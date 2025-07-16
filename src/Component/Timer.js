import { useEffect } from "react"

export default function Timer({dispatch, secondRemaining}) {

    useEffect(function() {
      const interval = setInterval(function() {
           dispatch({type: 'tick'}) 
       }, 1000)

       return () => clearInterval(interval)

    }, [dispatch])

    const min = String(Math.trunc(secondRemaining / 60)).padStart(2, 0)
    const sec = String(Math.trunc(secondRemaining % 60)).padStart(2, 0)

    return (
        <div className="timer">{min}:{sec}</div>
    )
}