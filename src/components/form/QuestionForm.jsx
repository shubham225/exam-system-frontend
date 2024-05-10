import React, { useEffect } from "react";

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
import { createNewOption } from "services/optionService.js";

function createData(id, optionText, isAnswer) {
    return { id, optionText, isAnswer };
}

const optionList = [
    createData('#12f45a', 'Frozen yoghurt', false),
    createData('#12f45b', 'Ice cream sandwich', false),
    createData('#12f45c', 'Eclair', false),
    createData('#12f45d', 'Cupcake', true),
    createData('#12f45e', 'Gingerbread', false),
    createData('#12f45f', 'Gingerbread', false),
    createData('#12f46a', 'Gingerbread', false),
    createData('#12f46b', 'Gingerbread', false),
    createData('#12f46c', 'Gingerbread', false),
  ];

const QuestionForm = (props) => {
    const [isAnswer, setIsAnswer] = React.useState(false);
    const [optionText, setOptionText] = React.useState("");
    const [options, setOptions] = React.useState([]);

    useEffect(() =>{
        setOptions(optionList);
    }
    ,[]);

    const addOptionToList = (e, data) => {
        e.preventDefault();
        if(data.optionText != ''){
            console.log(data);
            data = createNewOption(data)
            setOptions([...options,data]);
            setIsAnswer(false);
            setOptionText("");
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Input
                    name="questionText"
                    required
                    label="Question"
                    type="input"/>
            </Grid>
            <Grid item xs={12} >
                <Box display='flex' alignItems='baseline'>
                    <Box width={700}>
                        <FormGroup>
                            <TextField
                                fullWidth
                                required
                                name="newOptionText"
                                value={optionText}
                                onChange={(e) => setOptionText(e.target.value)}
                                label="New Option"
                                type="input"/>
                            <FormControlLabel 
                                control={<Checkbox checked={isAnswer} onClick={() => setIsAnswer(!isAnswer)}/>} 
                                label="Answer" />
                        </FormGroup>
                    </Box>
                    <Box flexGrow={1}/>
                    <Box>
                        <Button size='large' variant="contained" 
                            startIcon={<AddIcon/>} 
                            onClick={(e) => addOptionToList(e, {optionText, isAnswer})}>Add</Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <OptionsTable options={options} setOptions={setOptions}/>
            </Grid>
        </Grid>
    )
}

export default QuestionForm;