import './App.css';
import { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Grid, TextField, Button, Paper, styled, Box } from '@mui/material';

function App() {
  const [wordGrid, setWordGrid] = useState([])
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const solution = "CLEAR"
  const KBRow1 = "QWERTYUIOP"
  const KBRow2 = "ASDFGHJKL"
  const KBRow3 = "ZXCVBNM"
  const row1 = [];
  const row2 = [];
  const row3 = [];


  const handleSubmit = () => {
    let word = ""
    for (let i = 0; i < 5; i++) {
      word = word + (wordGrid[currentRow][i].letter)
    }
    console.log(word)
    if (word === solution) {
      setIsGameOver(true)
    }
  }

  for (let i = 0; i < KBRow1.length; i++) {
    row1.push(<button value={KBRow1[i]} onClick={(e) => handleClick(e)}>{KBRow1[i]}</button>)
  }
  for (let i = 0; i < KBRow2.length; i++) {
    row2.push(<button value={KBRow2[i]} onClick={(e) => handleClick(e)}>{KBRow2[i]}</button>)
  }
  for (let i = 0; i < KBRow3.length; i++) {
    row3.push(<button value={KBRow3[i]} onClick={(e) => handleClick(e)}>{KBRow3[i]}</button>)
  }


  useEffect(() => {
    function initializeWordGrid() {
      let newWordGrid = [];
      for (let i = 0; i < 6; i++) {
        newWordGrid.push([])
      }

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
          newWordGrid[i].push({ letter: "", state: "empty" })
        }
      }

      setWordGrid(newWordGrid)
    }

    if (wordGrid.length === 0) {
      initializeWordGrid();
    }
  })

  const handleClick = (e) => {
    if (currentCol < 5) {
      const newWordGrid = [...wordGrid]
      newWordGrid[currentRow][currentCol] = { letter: e.target.value, state: "empty" }
      setWordGrid(newWordGrid)
      if (currentCol < 6) {
        setCurrentCol(currentCol + 1)
      }
    }
  }

  const handleErase = (e) => {
    const newWordGrid = [...wordGrid]
    newWordGrid[currentRow][currentCol - 1] = { letter: "", state: "empty" }
    setWordGrid(newWordGrid)
    if (currentCol > 0) {
      setCurrentCol(currentCol - 1)
    }
  }

  return (
    <Container maxWidth="sm">
      <div className="App">
        <div className="Grid">
          {isGameOver && <div> Game Over! </div>}
          {wordGrid.map((row, rowIndex) => (
            <div className="Row">
              {row.map((col, colIndex) => (
                <div className="Box">
                  <div className="Letter">
                    {wordGrid[rowIndex][colIndex].letter}
                  </div>
                </div>
              ))
              }
            </div>
          ))}
        </div>
        <div className="Keyboard">
          <div className="KBRow">
            {row1}
          </div>
          <div className="KBRow">
            {row2}
          </div>
          <div className="KBRow">
            <Button onClick={(e) => handleSubmit(0)}>ENTER</Button>
            {row3}
            <Button onClick={(e) => handleErase(e)}>ERASE</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;