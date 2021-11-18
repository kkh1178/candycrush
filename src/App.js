import { useState, useEffect } from 'react';

const width = 8;
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  const threeInColumnCheck = () => {
    /*
    We are checking to see if we have three of the same color in each column. If we are comparing a square's color to the two 
    underneath it, we can skip the last two rows. Instead of hard coding the index of the last two columns, I will calculate 
    based on the width so I can change it if I want later.
    */
    const lastTwoRows = width * width - 2 * width

    for (let i = 0; i < lastTwoRows; i++) {
      const columnOfThree = [i, i + width, i + (width * 2)]
      const constantColor = currentColorArrangement[i]

      if (columnOfThree.every(square => currentColorArrangement[square] === constantColor)) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  /*
  We are checking to see if we have three of the same color in each row. If we are comparing a square's color to the next to
  it, we can skip the last two columns. This only works if the board is 8x8.

  Used basic modular arithmetic using this example 
  (https://stackoverflow.com/questions/46162545/skipping-numbers-in-a-for-loop-in-java-how-can-i-make-this-more-clean)

  I was to skip the last two columns in this function and there are 8 columns
  (i - 6 +8x) % 8 ===0 and (i - 7 + 8x) % 8 ===0
  */

  const threeInRowCheck = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const constantColor = currentColorArrangement[i]
      if ((i + 2) % 8 === 0 || (i + 1) % 8 === 0) {
        continue
      } else {
        if (rowOfThree.every(square => currentColorArrangement[square] === constantColor)) {
          rowOfThree.forEach(square => currentColorArrangement[square] = '')
        }
      }
    }
  }

  const fourInColumnCheck = () => {
    const lastThreeRows = width * width - 3 * width

    for (let i = 0; i < lastThreeRows; i++) {
      const columnOfFour = [i, i + width, i + (width * 2), i + (width * 3)]
      const constantColor = currentColorArrangement[i]

      if (columnOfFour.every(square => currentColorArrangement[square] === constantColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = "")
      }
    }
  }

  const fourInRowCheck = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const constantColor = currentColorArrangement[i]
      if ((i + 2) % 8 === 0 || (i + 1) % 8 === 0 || (i + 3) % 8 === 0) {
        continue
      } else {
        if (rowOfFour.every(square => currentColorArrangement[square] === constantColor)) {
          rowOfFour.forEach(square => currentColorArrangement[square] = '')
        }
      }
    }
  }

  const fiveInColumnCheck = () => {
    const lastFourRows = width * width - 4 * width

    for (let i = 0; i < lastFourRows; i++) {
      const columnOfFive = [i, i + width, i + (width * 2), i + (width * 3), i + (width * 4)]
      const constantColor = currentColorArrangement[i]

      if (columnOfFive.every(square => currentColorArrangement[square] === constantColor)) {
        columnOfFive.forEach(square => currentColorArrangement[square] = "")
      }
    }
  }

  const fiveInRowCheck = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
      const constantColor = currentColorArrangement[i]
      if ((i + 2) % 8 === 0 || (i + 1) % 8 === 0 || (i + 3) % 8 === 0 || (i + 4) % 8 === 0) {
        continue
      } else {
        if (rowOfFive.every(square => currentColorArrangement[square] === constantColor)) {
          rowOfFive.forEach(square => currentColorArrangement[square] = '')
        }
      }
    }
  }

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  // useEffect will run createBoard only once
  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      /* Check for the five in a column first so if the candy falls down the column, it will still have to run the four 
      and three in a column check
      */
      fiveInColumnCheck()
      fourInColumnCheck()
      threeInColumnCheck()
      fiveInRowCheck()
      fourInRowCheck()
      threeInRowCheck()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)

  }, [fiveInColumnCheck, fourInColumnCheck, threeInColumnCheck, fiveInRowCheck, fourInRowCheck, threeInRowCheck])

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor + index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
