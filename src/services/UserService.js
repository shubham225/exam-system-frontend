import request from "utils/AxiosHelper";

function getAllUsers() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "GET", "/user", {});
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

function getUserById(id) {
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

function assignExamToUsers(examId, users) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await request( "POST", ("/admin/exam/" + examId + "/assign"), users);
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

const UserService = {
    getAllUsers,
    getUserById,
    assignExamToUsers
}

export default UserService;