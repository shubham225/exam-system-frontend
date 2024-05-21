import request from "utils/AxiosHelper";

export function getQuestionsByModuleId(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", ("/admin/module/" + id + "/question"), {});
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

export function getQuestionById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", ("/admin/question/" + id), {});
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

export function createNewQuestion(question) {
    return new Promise(async (resolve, reject) => {

        try {
            const response = await request( "POST", "/admin/question", question);
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

function modifyQuestion(question) {
    return new Promise(async (resolve, reject) => {
        console.log("Modify Question : " + JSON.stringify(question));

        try {
            const response = await request( "PUT", ("/admin/question/" + question.id), question);
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

function deleteQuestionById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "DELETE", ("/admin/question/" + id), {});
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


const QuestionService = {
    getQuestionById,
    getQuestionsByModuleId,
    createNewQuestion,
    modifyQuestion,
    deleteQuestionById
}

export default QuestionService;