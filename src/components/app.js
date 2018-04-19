import React from 'react';

import Sudoku from './sudoku';

import { generatePuzzle } from '../lib/generator';

function App () {
    const { sudoku, difficulty } = generatePuzzle();
    return (
        <div>
            <Sudoku grid={sudoku} />
            <p>Difficulty: {difficulty}</p>
        </div>
    );
}

export default App;
