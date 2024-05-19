import { moduleList } from 'data/dummyData'

// TODO : Implement API Calls

function getModuleById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let module = moduleList.find((module) => module.id == id); 

            if(module) {
                resolve(module);
            }else {
                reject({});
            }
        },1000)
    });
}

function getModulesByExamId(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(moduleList) {
                resolve(moduleList);
            }else {
                reject({});
            }
        },1000)
    });
}

function createNewModule(module) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            module = {...module, id: ((Math.floor(Math.random() * 101)) + 11)}

            if(module) {
                resolve(module);
            }else {
                reject({});
            }
        },1000)
    });
}

function modifyModule(module) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(module) {
                resolve(module);
            }else {
                reject({});
            }
        },1000)
    });
}

function deleteModuleById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let module = moduleList.find((module) => module.id == id); 

            if(module) {
                resolve(module);
            }else {
                reject({});
            }
        },1000)
    });
}

const ModuleService = {
    getModuleById,
    getModulesByExamId,
    createNewModule,
    modifyModule,
    deleteModuleById
}

export default ModuleService;