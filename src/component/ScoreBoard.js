const ScoreBoard = ({ score }) => {
    return (
        <div className="score-board">
            <div className="test">
                <h2 className="score">Score: {score}</h2>
            </div>
        </div>
    )
}

export default ScoreBoard