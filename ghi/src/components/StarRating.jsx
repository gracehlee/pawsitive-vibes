function StarRating({ count, value, onChange }) {
    const handleClick = (index) => {
        const newRating = parseInt(index + 1)
        onChange(newRating)
    }

    return (
        <div>
            {[...Array(count)].map((star, index) => (
                <span
                    key={index}
                    onClick={() => handleClick(index)}
                    style={{
                        cursor: 'pointer',
                        color: index < value ? 'gold' : 'grey',
                        fontSize: '30px',
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    )
}

export default StarRating
