import { optionList } from 'data/dummyData'

export function getOptionsByQuestion(id) {
    // TODO : call api to fetch data
    return optionList;
}

export function createNewOption(option) {
    // TODO : Call API and add the exam then return new module with id
    option = {...option, id: (Math.random().toString(36).slice(-6))}
    return option;
}

export function getOptionById(id) {
    let option = optionList.find((option) => option.id == id); 
    return option ? option : {};
}