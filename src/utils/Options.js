export function Options({questObj, dispatch, answerIndex}) {

    const hasAnswered = answerIndex !== null

    return (
         <div className="options">
                {questObj.options.map((option, index) => <button 
                
                className={`btn btn-option ${index === answerIndex ? "answer" : ""} 
                ${ hasAnswered ? index === questObj.correctOption ? "correct" : index === answerIndex ? 'wrongAnswer' : 'wrong' : ""} `} 

                key={option}
                onClick={() => dispatch({type:'newAnswer', payload: index})}
                disabled={hasAnswered}
                >{option}</button>)}
            </div>
    )
}