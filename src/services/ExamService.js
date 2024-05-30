import request from "utils/AxiosHelper";

function getAllExams() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", "/admin/exam", {});
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

function getExamById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", ("/admin/exam/" + id), {});
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

function createNewExam(exam) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "POST", "/admin/exam", exam);
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

function modifyExam(exam) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "PUT", ("/admin/exam/" + exam.id), exam);
            
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

function deleteExamById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "DELETE", ("/admin/exam/" + id), {});
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

const ExamService = {
    getExamById,
    getAllExams,
    createNewExam,
    modifyExam,
    deleteExamById
}

export default ExamService;
