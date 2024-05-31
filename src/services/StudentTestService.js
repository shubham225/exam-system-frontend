import request, { removeAuth } from "utils/AxiosHelper";

function getAllExamsByUserId(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", ("/test/user/" + userId + "/exams") , {});

            resolve(response.data);
        }catch(error) {
            if(error.response) {
                reject(error.response.data);
            }else {
                const message = error.code + " : " + error.message;
                reject({message : message, status : error.status.toString()});
            }
            
            if (error.response.status == 401) {
                removeAuth();
            }
        }
    });
}

function getAssignedModulesByExamId(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", ("/test/exam/" + id + "/modules"), {});
            
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

function getAssignedQuestionsByModuleId(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", ("/test/module/" + id + "/questions"), {});

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

function getAssignedQuestionById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", ("/test/question/" + id), {});

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

function updateAssignedQuestion(question) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "PUT", ("/test/question/" + question.id), question);

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

function updateExamStatusById(id, status) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "PUT", ("/test/exam/" + id), {status : status});

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

const StudentTestService = {
    getAllExamsByUserId,
    getAssignedModulesByExamId,
    getAssignedQuestionsByModuleId,
    getAssignedQuestionById,
    updateAssignedQuestion,
    updateExamStatusById
}

export default StudentTestService;
