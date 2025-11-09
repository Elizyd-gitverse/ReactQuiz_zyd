import { Options } from "../../utils/Options"

export default function PlayScreen({questObj, dispatch, answerIndex}) {
    return (
        <div>
            <h4>{questObj.question}</h4>
            <Options questObj={questObj} dispatch={dispatch} answerIndex={answerIndex}/>
        </div>
    )
}