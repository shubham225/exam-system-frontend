import { moduleList } from 'data/dummyData'

export function getAllModules() {
    // TODO : call api to fetch data
    return moduleList;
}

export function createNewModule(module) {
    // TODO : Call API and add the exam then return new module with id
    module = {...module, id: ((Math.floor(Math.random() * 101)) + 11)}
    return module;
}

export function getModuleById(id) {
    let module = moduleList.find((module) => module.id == id); 
    return module ? module : {};
}