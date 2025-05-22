export default function EmojiSelect() {

    return (
        <>
            <label>
                Pick a emoji type:
            <select name="selectedEmoji">
                <option value="food">Food</option>
                <option value="sports">Sports</option>
                <option value="animal">Animal</option>
                <option value="pet">Pet</option>
                <option value="people">People</option>
                <option value="face">Faces</option>
            </select>
            </label>
        </>
    )
}