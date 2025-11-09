export default function NextButton({dispatch, answerIndex, index, numQuestion}) {
    if(answerIndex === null) return;

    if(index < numQuestion - 1) return (
     <button className="btn btn-ui" onClick={() => dispatch({type: 'nextQuestion'})}>Next</button>
    );

   if(index === numQuestion - 1) return (
     <button style={{backgroundColor: "rgba(255, 0, 0, 0.682)"}} className="btn btn-ui" onClick={() => dispatch({type: 'Finished'})}>Finish</button>
    );
}