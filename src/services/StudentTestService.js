import request from "utils/AxiosHelper";
import { QuestionStatus } from 'utils/Enums';
import { ExamStatus } from 'utils/Enums';

function getAllExamsByUserId(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            //const response = await request( "GET", "/admin/exam", {});
            console.log("getting all exams for : " + userId);

            let newExams = [];


            newExams = [{id : 1, name : ('Exam- Software Dev'), description : ("This is description for exam - Software Dev "), status : ExamStatus.COMPLETED, duration : 3600},
                        {id : 2, name : ('Exam- Software Dev-2'), description : ("This is description for exam - Software Dev - 2 "), status : ExamStatus.IN_PROGRESS, duration : 10},
                        {id : 3, name : ('Exam- Software Dev-3'), description : ("This is description for exam - Software Dev - 3 "), status : ExamStatus.PENDING, duration : 300}
                    ];

            const response = {data : newExams}
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

function getAssignedModulesByExamId(id) {
    return new Promise(async (resolve, reject) => {
        try {
            // const response = await request( "GET", ("/admin/exam/" + id), {});
            console.log("getting assigned modules for exam id : ", id);

            let moduleList = [{id: 1, moduleName: "Aptitute"},{id: 2, moduleName: "Programming"}];
            const response = {data : moduleList};
            
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
            // const response = await request( "GET", ("/admin/exam/" + id), {});
            console.log("getting assigned questions for module id : ", id);

            let questionList = [];
            for (let i = 0; i < 100; i++) {
                questionList = [...questionList, {id : i, seq : i, status : QuestionStatus.NOT_VISITED}];
                
            }
            const response = {data : questionList};

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
            // const response = await request( "GET", ("/admin/exam/" + id), {});
            console.log("getting assigned question : ", id);

            let question = {
                id : id, 
                questionText : "This is a test question - " + id + "?",
                moduleId : 0,
                status : QuestionStatus.NOT_VISITED,
                answer : '',
                options : [
                  {
                    id : 1,
                    optionText : "Option 1"
                  },
                  {
                    id : 2,
                    optionText : "Option 2"
                  },
                  {
                    id : 3,
                    optionText : "Option 3"
                  },
                  {
                    id : 4,
                    optionText : "Option 4"
                  }
                ]
            }

            const response = {data : question};

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
            // const response = await request( "GET", ("/admin/exam/" + id), {});
            console.log("saving in backend...", question)

            const response = {data : question};

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
            // const response = await request( "GET", ("/admin/exam/" + id), {});
            console.log("updating exam status in backend...",id, " status : ", status)

            const response = {data : status};

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
