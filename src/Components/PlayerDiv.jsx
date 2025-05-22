import { useState } from "react"

export default function PlayerDiv() {

    let [selectedOption, setSelectedOption] = useState('')
    function handleChange(e) {
        setSelectedOption(e.target.value)
    }

    return (
        <>
            <div>
                <label>
                Pick a emoji type:
            <select name="selectedEmoji" value={selectedOption} onChange={handleChange}>
                <option value="">---Select an option---</option>
                <option value="food">Food</option>
                <option value="sports">Sports</option>
                <option value="animal">Animal</option>
                <option value="pet">Pet</option>
                <option value="people">People</option>
                <option value="face">Faces</option>
            </select>
            </label>
            </div>
        </>
    )
}