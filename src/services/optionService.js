import { optionList } from 'data/dummyData'

export function getOptionsByQuestion(id) {
    // TODO : call api to fetch data
    return optionList;
}

export function createNewOption(option) {
    // TODO : Call API and add the exam then return new module with id
    option = {...option, id: ((Math.floor(Math.random() * 101)) + 11)}
    return option;
}

export function getOptionById(id) {
    let question = optionList.find((question) => question.id == id); 
    return question ? question : {id : 0, optionText: "Not Found", isAnswer: false};
}