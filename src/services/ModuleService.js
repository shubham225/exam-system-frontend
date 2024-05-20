import request from "utils/AxiosHelper";

function getModulesByExamId(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", ("/admin/exam/" + id + "/module"), {});
            resolve(response.data);
        }catch(error) {
            if(error.response) {
                reject(error.response.data);
            }else {
                const message = error.code + " : " + error.message;
                reject({message : message});
            }
        }
    });
}

function getModuleById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", ("/admin/module/" + id), {});
            resolve(response.data);
        }catch(error) {
            if(error.response) {
                reject(error.response.data);
            }else {
                const message = error.code + " : " + error.message;
                reject({message : message});
            }
        }
    });
}

function createNewModule(module) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "POST", "/admin/module", module);
            resolve(response.data);
        }catch(error) {
            if(error.response) {
                reject(error.response.data);
            }else {
                const message = error.code + " : " + error.message;
                reject({message : message});
            }
        }
    });
}

function modifyModule(module) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "PUT", ("/admin/module/" + module.id), module);
            resolve(response.data);
        }catch(error) {
            if(error.response) {
                reject(error.response.data);
            }else {
                const message = error.code + " : " + error.message;
                reject({message : message});
            }
        }
    });
}

function deleteModuleById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "DELETE", ("/admin/module/" + id), {});
            resolve(response.data);
        }catch(error) {
            if(error.response) {
                reject(error.response.data);
            }else {
                const message = error.code + " : " + error.message;
                reject({message : message});
            }
        }
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