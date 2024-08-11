import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BiotechIcon from '@mui/icons-material/Biotech';
import { DataGrid } from '@mui/x-data-grid';

function getStyles(item, array, theme) {
  return {
    fontWeight:
      array.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const columns = [
  { 
    field: 'name', 
    headerName: 'Food Supplement', 
    flex: 0.5,
    renderHeader: (params: GridColumnHeaderParams) => (<strong>{params.colDef.headerName}</strong>),
  },
  { 
    field: 'description', 
    headerName: 'Description', 
    flex: 1,
    renderHeader: (params: GridColumnHeaderParams) => (<strong>{params.colDef.headerName}</strong>),
  },
];


const getRowId = (row) => {
  return row._id;
}
 
const Questions = () => {  
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [priority, setPriority] = useState('');
  const [score, setScore] = useState('');
  const [molecules, setMolecules] = useState([]);

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

  const fetchMolecules = () => {
    fetch('http://system.aja.bio/backend/api/calculations/selectBestFive')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('Molecules')
      console.log(data);
      setMolecules(data);
    });
   };

  const handleChangeQuestion = (event) => {
    console.log('SELECTED QUESTION ID');
    console.log(event.target.value);
    setQuestion(event.target.value);
    setAnswer('');
    setPriority('');
    setScore('');
  };

  const handleChangeAnswer = (event) => {
    console.log('SELECTED ANSWER ID');
    console.log(event.target.value);
    setAnswer(event.target.value);
    setPriority('');
    setScore('');
  };

  const handleChangePriority = (event) => {
    console.log('SELECTED PRIORITY VALUE');
    console.log(event.target.value);
    setPriority(event.target.value);
  };

  const handleChangeScore = (event) => {
    console.log('SELECTED SCORE VALUE');
    console.log(event.target.value);
    setScore(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      {molecules.length===0 
      ?
        <>
          <FormControl fullWidth>
            <InputLabel id="question-select-label">Question</InputLabel>
            <Select
              labelId="question-select-label"
              id="question-select"
              value={question}
              label="Question"
              onChange={handleChangeQuestion}
            >
              {questions.filter((q) => q.isThemeRelated).map((q) => (
                <MenuItem
                  key={q.text}
                  value={q._id}
                >
                  {q.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {question && question!=='' && <FormControl fullWidth>
            <InputLabel id="answer-select-label">Answer</InputLabel>
            <Select
              labelId="answer-select-label"
              id="answer-select"
              value={answer}
              label="Answer"
              onChange={handleChangeAnswer}
            >
              {questions.find((q) => q._id===question).answers.map((a) => (
                <MenuItem
                  key={a.answer}
                  value={a._id}
                >
                  {a.answer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>}
          {answer && answer!=='' && <FormControl fullWidth>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              value={priority}
              label="Priority"
              onChange={handleChangePriority}
            >
              {[{key: 'I', value: 1}, {key: 'II', value: 2}].map((p) => (
                <MenuItem
                  key={p.key}
                  value={p.value}
                >
                  {p.key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>}
          {answer && answer!=='' && <FormControl fullWidth>
            <InputLabel id="score-select-label">Score</InputLabel>
            <Select
              labelId="score-select-label"
              id="score-select"
              value={score}
              label="Score"
              onChange={handleChangeScore}
            >
              {[1,2,3,4,5,6,7,8,9,10].map((s) => (
                <MenuItem
                  key={s}
                  value={s}
                >
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>}
          {priority && priority!=='' && score && score!=='' && 
            <Button variant="contained" onClick={fetchMolecules} endIcon={<BiotechIcon />}>
              Analyze
            </Button>
          }
        </>
      :
        <DataGrid
          rows={molecules}
          columns={columns}
          getRowId={getRowId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          autoHeight
          getRowHeight={ () => 'auto' }
        />
      }  
    </Box>
   );
};
 
export default Questions;