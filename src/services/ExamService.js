import { examList } from 'data/dummyData'

// TODO : Implement API Calls

function getExamById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetching Exam by Id : " + id);
            let exam = examList.find((exam) => exam.id == id); 
        
            if(exam) {
                resolve(exam);
            }else {
                reject({});
            }
        },1000)
    });
}

function getAllExams() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetching All Exams");
            resolve(examList);
        },2000)
    });
    // return examList;
}


function createNewExam(exam) {
    // TODO : Call API and add the exam then return new exam with id
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Creating New Exam : " + JSON.stringify(exam));
            exam = {...exam, id: ((Math.floor(Math.random() * 101))+ 11)}

            if(exam) {
                resolve(exam);
            }else {
                reject({});
            }
        },1000)
    });
}

function modifyExam(exam) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Modifying Exam : " + JSON.stringify(exam));
            if(exam) {
                resolve(exam);
            }else {
                reject({});
            }
        },1000)
    });
}

function deleteExamById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Deleting Exam by Id : " + id);
            const exam = examList.find((exam) => exam.id == id);

            if(exam) {
                resolve(exam);
            }else {
                reject({});
            }
        },1000)
    });
}

const ExamService = {
    getExamById,
    getAllExams,
    createNewExam,
    modifyExam,
    deleteExamById
}

export default ExamService;