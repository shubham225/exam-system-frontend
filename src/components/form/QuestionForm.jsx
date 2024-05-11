import React, { useEffect, useState } from "react";

import {Grid} from '@mui/material';
import Input  from "components/ui/Input";
import OptionsTable from 'components/form/OptionsTable.jsx'
import { Action } from "utils/Enums.js";


const QuestionForm = (props) => {
    const {
        question,
        setQuestion,
        action
    } = props;

    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(question.options);
    },[question]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Input
                    name="questionText"
                    label="Question"
                    type="input"
                    disabled ={action == Action.DISPLAY_RECORD}
                    value={question.questionText}
                    onChange={(e) => {e.preventDefault(); setQuestion({...question, questionText: e.target.value})}}
                    required />
            </Grid>
            <Grid item xs={12}>
                <OptionsTable options={options} setOptions={setOptions} action={action} question={question} setQuestion={setQuestion}/>
            </Grid>
        </Grid>
    )
}

export default QuestionForm;