export function Stars({ difficulty }: { difficulty: string }) {
  function determineDifficulty(difficulty: string) {
    if (difficulty === 'Easy') return 1
    if (difficulty === 'Medium') return 2
    return 3
  }

  return (
    <>
      {[...Array(3)].map((_, index) => (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key={index}
        >
          <path
            d="M6.85 15.6053L10 13.6053L13.15 15.6316L12.325 11.8421L15.1 9.31579L11.45 8.97368L10 5.39474L8.55 8.94737L4.9 9.28947L7.675 11.8421L6.85 15.6053ZM3.825 20L5.45 12.6053L0 7.63158L7.2 6.97368L10 0L12.8 6.97368L20 7.63158L14.55 12.6053L16.175 20L10 16.0789L3.825 20Z"
            fill="black"
          />
          <path
            d="M6.5 16L7.27 11.9329L4 9.19737L8.32 8.83553L10 5L11.5 8.85L16 9.19737L12.73 11.9329L13.5 16L10 13.8434L6.5 16Z"
            fill={index < determineDifficulty(difficulty) ? 'black' : 'white'}
          />
        </svg>
      ))}
    </>
  )
}
