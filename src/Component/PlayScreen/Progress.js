export default function Progress({index, numQuestion, points, maxPoints, answerIndex}) {
    return (
        <header className="progress">
            <progress max={numQuestion} value={index + Number(answerIndex !== null)} />
            <p>Question <strong>{index + 1}</strong> / {numQuestion}</p>
            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    )
}