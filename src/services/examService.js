import { Description } from '@mui/icons-material';
import { examList } from 'data/dummyData'

export function getAllExams() {
    // TODO : call api to fetch data
    return examList;
}

export function getExamById(id) {
    let exam = examList.find((exam) => exam.id == id); 
    return exam ? exam : {};
}

export function createNewExam(exam) {
    // TODO : Call API and add the exam then return new exam with id
    exam = {...exam, id: ((Math.floor(Math.random() * 101))+ 11)}
    return exam;
}