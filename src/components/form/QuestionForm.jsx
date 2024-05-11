import React, { useEffect, useState } from "react";

import {Box, 
        Grid,
        InputLabel,
        FormControl, 
        FormLabel,
        FormControlLabel,
        RadioGroup,
        Radio,
        Select,
        MenuItem,
        Button, 
        List,
        ListItem,
        Checkbox,
        ListItemButton,
        ListItemAvatar,
        Avatar,
        ListItemText,
        TextField,
        Typography,
        FormGroup} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import useForm from "../../utils/FormHelper.jsx";
import Input  from "components/ui/Input";
import OptionsTable from 'components/form/OptionsTable.jsx'
import { CheckBox } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { createNewOption, getOptionsByQuestion } from "services/optionService.js";
import OptionForm from "./OptionForm.jsx";
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
        //setOptions(getOptionsByQuestion(question.id));
    },[question]);

    // useEffect(() => {
    //     setQuestion(
    //             {
    //                 ...question,
    //                 options: options
    //             });
    // },[options]);

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
                <OptionsTable options={options} setOptions={setOptions} action={action}/>
            </Grid>
        </Grid>
    )
}

export default QuestionForm;