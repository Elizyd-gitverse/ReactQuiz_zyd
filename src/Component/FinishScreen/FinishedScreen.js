export default function FinishedScreen({points, maxPoints, highScore, dispatch}) {
    const perCent = ( points / maxPoints ) * 100

    let emoji;
    if(perCent === 100) emoji = '🥇'
    if(perCent >= 75 && perCent < 100)  emoji = '🥈'
    if(perCent >= 50 && perCent < 75)  emoji = '🥉'
    if(perCent >= 25 && perCent < 50)  emoji = '❤️‍🔥'
    if(perCent >= 0 && perCent < 25)  emoji = '❤️‍🩹'
    if(perCent === 0) emoji = '💔'

    return(
      <>
        <p className="result">
         {emoji} You Scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(perCent)}%)        
        </p>
        <p className="highscore">Highscore: {highScore} points</p>
        <button className="btn btn-ui" onClick={() => dispatch({type: "restart"})}>Restart 🚀</button>
      </>  
    )
}