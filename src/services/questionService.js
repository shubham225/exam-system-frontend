import { questionList } from 'data/dummyData'

export function getQuestionsByModule(id) {
    // TODO : call api to fetch data
    return questionList;
}

export function createNewQuestion(question) {
    // TODO : Call API and add the exam then return new module with id
    question = {...question, id: ((Math.floor(Math.random() * 101)) + 11)}
    return question;
}

export function getQuestionById(id) {
    let question = questionList.find((question) => question.id == id); 
    return question ? question : {id : 0, questionText: "Not Found", description: "not found"};
}