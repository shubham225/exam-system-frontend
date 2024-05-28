import { Grid } from '@mui/material'
import React from 'react'
import ExamCard from 'components/ui/ExamCard';
import { ExamStatus } from 'utils/Enums';
import Timer from 'components/ui/Timer';

function Examination() {
  const [exams, setExams] = React.useState([]);
  const time = new Date();

  React.useEffect(() => {
    let newExams = [];

    for (let i = 0; i < 4; i++) {
      newExams = [...newExams, {id : i, name : ('Exam-'+i), description : ("This is description for exam - " + i), status : ExamStatus.PENDING}];
    }
    
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  
    setExams(newExams);
  },[])

  return (
    <Grid container height='100%' width='70%' justifyContent='space-around' alignContent='space-around' overflow='auto'>
      {exams.map((exam) => 
        <Grid item >
          <ExamCard exam={exam}/>
        </Grid>
      )}
    </Grid>
  )
}

export default Examination