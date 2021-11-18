import { useState, useEffect } from 'react';

import ScoreBoard from './component/ScoreBoard';
import blueCandy from "./images/blue-candy.png"
import greenCandy from "./images/green-candy.png"
import orangeCandy from "./images/orange-candy.png"
import purpleCandy from "./images/purple-candy.png"
import redCandy from "./images/red-candy.png"
import yellowCandy from "./images/yellow-candy.png"
import blank from "./images/blank.png"

const width = 8;
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
];

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [draggedSquare, setDraggedSquare] = useState(null)
  const [replacedSquare, setReplacedSquare] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0);

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
      const blankSquare = currentColorArrangement[i] === blank

      if (columnOfThree.every(square => currentColorArrangement[square] === constantColor && !blankSquare)) {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true
      }
    }
  }

  /*
  We are checking to see if we have three of the same color in each row. If we are comparing a square's color to the next to
  it, we can skip the last two columns. 

  Used basic modular arithmetic using this example 
  (https://stackoverflow.com/questions/46162545/skipping-numbers-in-a-for-loop-in-java-how-can-i-make-this-more-clean)

  I was to skip the last two columns in this function and there are 8 columns
  (i - 6 +8x) % 8 ===0 and (i - 7 + 8x) % 8 ===0
  */

  const threeInRowCheck = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const constantColor = currentColorArrangement[i]
      const blankSquare = currentColorArrangement[i] === blank
      if ((i + 2) % width === 0 || (i + 1) % width === 0) {
        continue
      } else {
        if (rowOfThree.every(square => currentColorArrangement[square] === constantColor && !blankSquare)) {
          rowOfThree.forEach(square => currentColorArrangement[square] = blank)
          setScoreDisplay((score) => score + 3)
          return true
        }
      }
    }
  }

  const fourInColumnCheck = () => {
    const lastThreeRows = width * width - 3 * width

    for (let i = 0; i < lastThreeRows; i++) {
      const columnOfFour = [i, i + width, i + (width * 2), i + (width * 3)]
      const constantColor = currentColorArrangement[i]
      const blankSquare = currentColorArrangement[i] === blank

      if (columnOfFour.every(square => currentColorArrangement[square] === constantColor && !blankSquare)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        setScoreDisplay((score) => score + 4)
        return true
      }
    }
  }

  const fourInRowCheck = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const constantColor = currentColorArrangement[i]
      const blankSquare = currentColorArrangement[i] === blank
      if ((i + 2) % width === 0 || (i + 1) % width === 0 || (i + 3) % width === 0) {
        continue
      } else {
        if (rowOfFour.every(square => currentColorArrangement[square] === constantColor && !blankSquare)) {
          rowOfFour.forEach(square => currentColorArrangement[square] = blank)
          setScoreDisplay((score) => score + 4)
          return true
        }
      }
    }
  }

  const fiveInColumnCheck = () => {
    const lastFourRows = width * width - 4 * width

    for (let i = 0; i < lastFourRows; i++) {
      const columnOfFive = [i, i + width, i + (width * 2), i + (width * 3), i + (width * 4)]
      const constantColor = currentColorArrangement[i]
      const blankSquare = currentColorArrangement[i] === blank

      if (columnOfFive.every(square => currentColorArrangement[square] === constantColor && !blankSquare)) {
        columnOfFive.forEach(square => currentColorArrangement[square] = blank)
        setScoreDisplay((score) => score + 5)
        return true
      }
    }
  }

  const fiveInRowCheck = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
      const constantColor = currentColorArrangement[i]
      const blankSquare = currentColorArrangement[i] === blank
      if ((i + 2) % width === 0 || (i + 1) % width === 0 || (i + 3) % width === 0 || (i + 4) % width === 0) {
        continue
      } else {
        if (rowOfFive.every(square => currentColorArrangement[square] === constantColor && !blankSquare)) {
          rowOfFive.forEach(square => currentColorArrangement[square] = blank)
          setScoreDisplay((score) => score + 5)
          return true
        }
      }
    }
  }

  // This will move all of the blank sqaures to the top of the board
  const moveIntoSquareBelow = () => {
    // For all of the squares minus the last row based on the width, do the following
    for (let i = 0; i < (width * width - width); i++) {
      // Create an array with the index of the first row based on the width
      const firstRowIndex = [...Array(width).keys()]
      const firstRow = firstRowIndex.includes(i)

      // If the first row has a blank square, chose a new color
      if (firstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      // if the square below the one we are currently looking at is blank
      if (currentColorArrangement[i + width] === blank) {
        // then move the current one down
        currentColorArrangement[i + width] = currentColorArrangement[i]
        // Set the current square to blank
        currentColorArrangement[i] = blank
      }
    }
  }

  const dragStart = (e) => {
    setDraggedSquare(e.target)
  }
  const dragDrop = (e) => {
    setReplacedSquare(e.target)
  }
  const dragEnd = (e) => {
    // Getting the index of the sqaures being moved
    const draggedSquareId = parseInt(draggedSquare.getAttribute('data-id'))
    const replacedSquareId = parseInt(replacedSquare.getAttribute('data-id'))

    // Swapping the background colors
    currentColorArrangement[replacedSquareId] = draggedSquare.getAttribute('src')
    currentColorArrangement[draggedSquareId] = replacedSquare.getAttribute('src')

    const validMoves = [
      draggedSquareId - 1,
      draggedSquareId - width,
      draggedSquareId + 1,
      draggedSquareId + width
    ]

    const validMove = validMoves.includes(replacedSquareId)

    const columnOfFive = fiveInColumnCheck()
    const columnOfFour = fourInColumnCheck()
    const columnOfThree = threeInColumnCheck()
    const rowOfFive = fiveInRowCheck()
    const rowOfFour = fourInRowCheck()
    const rowOfThree = threeInRowCheck()

    if (replacedSquareId && validMove && (columnOfFive || columnOfFour || columnOfThree || rowOfFive || rowOfFour || rowOfThree)) {
      setDraggedSquare(null)
      setReplacedSquare(null)
    } else {
      currentColorArrangement[replacedSquareId] = replacedSquare.getAttribute('src')
      currentColorArrangement[draggedSquareId] = draggedSquare.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangement])
    }
  }

  const dragOverTest = (e) => {
    e.preventDefault()
    e.stopPropagation();
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
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)

  }, [fiveInColumnCheck, fiveInRowCheck, fourInColumnCheck, fourInRowCheck, threeInColumnCheck, threeInRowCheck, moveIntoSquareBelow, currentColorArrangement])

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={dragOverTest}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <div>
        <ScoreBoard score={scoreDisplay} />
      </div>
    </div>
  );
}

export default App;
