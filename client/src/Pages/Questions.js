import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
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

const Questions = (props) => {  
  const [answer, setAnswer] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [molecules, setMolecules] = useState([]);
  const [priority, setPriority] = useState('');
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState('');

  const { questionId } = props;
  const theme = useTheme();
  const params = useParams();

  useEffect(() => {
    fetch('http://system.aja.bio/backend/api/questions')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('QUESTIONS')
      console.log(data);
      setQuestions(data);
      if (questionId) {
        setQuestion(questionId);
        setDisabled(true);
      }
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
  };

  const handleChangeAnswer = (event) => {
    console.log('SELECTED ANSWER ID');
    console.log(event.target.value);
    setAnswer(event.target.value);
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
            <InputLabel id="theme-select-label">Theme</InputLabel>
            <Select
              labelId="theme-select-label"
              id="theme-select"
              value={question}
              label="Theme"
              disabled={disabled}
              onChange={handleChangeQuestion}
            >
              {questions?.filter((q) => q.isThemeRelated).map((q) => (
                <MenuItem
                  key={q.theme}
                  value={q._id}
                >
                  {q.theme}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="question-select-label">Question</InputLabel>
            <Select
              labelId="question-select-label"
              id="question-select"
              value={question}
              label="Question"
              disabled={disabled}
              onChange={handleChangeQuestion}
            >
              {questions?.filter((q) => q.isThemeRelated).map((q) => (
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
              {questions?.find((q) => q._id===question)?.answers?.map((a) => (
                <MenuItem
                  key={a.answer}
                  value={a._id}
                >
                  {a.answer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>}
          {answer && answer!=='' && questions.filter((q) => !q.isThemeRelated).map((q) => (
            <FormControl fullWidth>
              <InputLabel id="priority-select-label">{q.theme}</InputLabel>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value=""
                label={q.theme}
                onChange={handleChangePriority}
              >
                {q.answers.map((a) => (
                  <MenuItem
                    key={a.answer}
                    value={a._id}
                  >
                    {a.answer}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
          {answer && answer!=='' &&
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