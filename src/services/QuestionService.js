import { questionList } from 'data/dummyData'

export function getQuestionById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
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
            let question = questionList.find((question) => question.id == id); 

            if(question) {
                resolve(question);
            }else {
                reject({});
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