import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './App.css';

function getStyles(item, array, theme) {
  return {
    fontWeight:
      array.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function App() {
  const [questions, setQuestions] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    fetch('http://system.aja.bio/backend/api/questions')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('QUESTIONS')
        console.log(data);
        setQuestions(data);
      });
  }, []);

  const handleChange = (event) => {

  };

  return (
    <div className="App">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="question-select-label">Question</InputLabel>
          <Select
            labelId="question-select-label"
            id="question-select"
            value={''}
            label="Question"
            onChange={handleChange}
          >
            {questions.filter((question) => question.isThemeRelated).map((question) => (
              <MenuItem
                key={question.text}
                value={questions._id}
                style={getStyles(questions._id, [], theme)}
              >
                {question.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default App;
