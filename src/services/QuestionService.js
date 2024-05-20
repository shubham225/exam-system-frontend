import { questionList } from 'data/dummyData'

export function getQuestionById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetching Questions By Id : " + id);
            let question = questionList.find((question) => question.id == id); 

            if(question) {
                resolve(question);
            }else {
                reject({});
            }
        },1000)
    });
}

export function getQuestionsByModuleId(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetching Questions By Module Id : " + id);
            if(questionList) {
                resolve(questionList);
            }else {
                reject({});
            }
        },1000)
    });
}

export function createNewQuestion(question) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Creating New Question : " + JSON.stringify(question));
            question = {...question, id: ((Math.floor(Math.random() * 101)) + 11)}

            if(module) {
                resolve(question);
            }else {
                reject({});
            }
        },1000)
    });
}

function modifyQuestion(question) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Modifying Question : " + JSON.stringify(question));
            if(question) {
                resolve(question);
            }else {
                reject({});
            }
        },1000)
    });
}

function deleteQuestionById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Deleting Question by Id : " + id);
            let question = questionList.find((question) => question.id == id); 
            
            if(question) {
                resolve(question);
            }else {
                reject({message : "Question not found in backend"});
            }
        },1000)
    });
}


const QuestionService = {
    getQuestionById,
    getQuestionsByModuleId,
    createNewQuestion,
    modifyQuestion,
    deleteQuestionById
}

export default QuestionService;