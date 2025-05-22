import Square from "./Square"

export default function Grid() {

    return(
        <>
            <div className="board-row" id="row1">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row" id="row2">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row" id="row3">
                <Square />
                <Square />
                <Square />
            </div>
        </>
    )
}