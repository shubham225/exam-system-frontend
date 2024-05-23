export const examList = 
[
    { "id": 1, "examName": "Exam - 1", "description": "Description for 1" },
    { "id": 2, "examName": "Exam - 2", "description": "Description for 2" },
    { "id": 3, "examName": "Exam - 3", "description": "Description for 3" },
    { "id": 4, "examName": "Exam - 4", "description": "Description for 4" },
    { "id": 5, "examName": "Exam - 5", "description": "Description for 5" },
    { "id": 6, "examName": "Exam - 6", "description": "Description for 6" },
    { "id": 7, "examName": "Exam - 7", "description": "Description for 7" },
    { "id": 8, "examName": "Exam - 8", "description": "Description for 8" },
]

export const moduleList = 
[
    { "id": 1, "moduleName": "Module - 1", "description": "Description for 1" },
    { "id": 2, "moduleName": "Module - 2", "description": "Description for 2" },
    { "id": 3, "moduleName": "Module - 3", "description": "Description for 3" },
    { "id": 4, "moduleName": "Module - 4", "description": "Description for 4" },
    { "id": 5, "moduleName": "Module - 5", "description": "Description for 5" },
    { "id": 6, "moduleName": "Module - 6", "description": "Description for 6" },
    { "id": 7, "moduleName": "Module - 7", "description": "Description for 7" },
    { "id": 8, "moduleName": "Module - 8", "description": "Description for 8" },
]

export const questionList = 
[
    { 
        "id": 1, "questionText": "Question - Snow", 
        "options": [
                { "id": 1, "optionText": "Option 1", "isAnswer": false },
                { "id": 2, "optionText": "Option 2", "isAnswer": true },
                { "id": 3, "optionText": "Option 3", "isAnswer": false }] 
    },
    { 
        "id": 2, "questionText": "Question - Lannister", 
        "options": [
            { "id": 1, "optionText": "Option 1", "isAnswer": false },
            { "id": 2, "optionText": "Option 2", "isAnswer": true },
            { "id": 3, "optionText": "Option 3", "isAnswer": false }] },
    { 
        "id": 3, "questionText": "Question - Lannister", 
        "options": [
            { "id": 1, "optionText": "Option 1", "isAnswer": false },
            { "id": 2, "optionText": "Option 2", "isAnswer": true },
            { "id": 3, "optionText": "Option 3", "isAnswer": false }] },
    { 
        "id": 4, "questionText": "Question - Stark", 
        "options": [
            { "id": 1, "optionText": "Option 1", "isAnswer": false },
            { "id": 2, "optionText": "Option 2", "isAnswer": true },
            { "id": 3, "optionText": "Option 3", "isAnswer": false }] },
    { 
        "id": 5, "questionText": "Question - Targaryen", 
        "options": [
            { "id": 1, "optionText": "Option 1", "isAnswer": false },
            { "id": 2, "optionText": "Option 2", "isAnswer": true },
            { "id": 3, "optionText": "Option 3", "isAnswer": false }] },
    { 
        "id": 6, "questionText": "Question - Melisandre", 
        "options": [
            { "id": 1, "optionText": "Option 1", "isAnswer": false },
            { "id": 2, "optionText": "Option 2", "isAnswer": true },
            { "id": 3, "optionText": "Option 3", "isAnswer": false }] },
    { 
        "id": 7, "questionText": "Question - Clifford", 
        "options": [
            { "id": 1, "optionText": "Option 1", "isAnswer": false },
            { "id": 2, "optionText": "Option 2", "isAnswer": false },
            { "id": 4, "optionText": "Option 4", "isAnswer": true }] },
    { 
        "id": 8, "questionText": "Question - Frances", 
        "options": [
            { "id": 1, "optionText": "Option 1", "isAnswer": false },
            { "id": 2, "optionText": "Option 2", "isAnswer": true },
            { "id": 5, "optionText": "Option 5", "isAnswer": false }] },
]

export const optionList = 
[
    { "id": 1, "optionText": "Option 1", "isAnswer": false },
    { "id": 2, "optionText": "Option 2", "isAnswer": true },
    { "id": 3, "optionText": "Option 3", "isAnswer": false },
    { "id": 4, "optionText": "Option 4", "isAnswer": false },
    { "id": 5, "optionText": "Option 5", "isAnswer": false }
]

export const assignedExams = [
    { "id": 1, "examName": "Exam - 1", "description": "Description for 1" },
    { "id": 2, "examName": "Exam - 2", "description": "Description for 2" }
]

export const assignedModule = 
[
    { "id": 1, "examId": 1, "moduleName": "Module - 1", "description": "Description for 1" },
    { "id": 2, "examId": 1, "moduleName": "Module - 2", "description": "Description for 2" },
    { "id": 3, "examId": 2, "moduleName": "Module - 3", "description": "Description for 3" },
    { "id": 4, "examId": 2, "moduleName": "Module - 4", "description": "Description for 4" },
    { "id": 5, "examId": 2, "moduleName": "Module - 5", "description": "Description for 5" },
]

export const testQuestions = 
[
    { 
        "id": 1, "questionText": "Question - Question 1", 
        "moduleId" : 1,
        "bookmarked" : false,
        "options": [
                { "id": 1, "optionText": "Option 1", "checked": false },
                { "id": 2, "optionText": "Option 2", "checked": false },
                { "id": 3, "optionText": "Option 3", "checked": false }] 
    },
    { 
        "id": 2, "questionText": "Question - Question 2", 
        "moduleId" : 1,
        "bookmarked" : true,
        "options": [
                { "id": 1, "optionText": "Option 1", "checked": false },
                { "id": 2, "optionText": "Option 2", "checked": false },
                { "id": 3, "optionText": "Option 3", "checked": false }] 
    },
    { 
        "id": 3, "questionText": "Question - Question 3", 
        "moduleId" : 1,
        "bookmarked" : false,
        "options": [
                { "id": 1, "optionText": "Option 1", "checked": false },
                { "id": 2, "optionText": "Option 2", "checked": false },
                { "id": 3, "optionText": "Option 3", "checked": false }] 
    },
    
    { 
        "id": 4, "questionText": "Question - Question 4", 
        "moduleId" : 2,
        "bookmarked" : false,
        "options": [
                { "id": 1, "optionText": "Option 1", "checked": false },
                { "id": 2, "optionText": "Option 2", "checked": false },
                { "id": 3, "optionText": "Option 3", "checked": false }] 
    },
    
    { 
        "id": 5, "questionText": "Question - Question 5", 
        "moduleId" : 2,
        "bookmarked" : true,
        "options": [
                { "id": 1, "optionText": "Option 1", "checked": false },
                { "id": 2, "optionText": "Option 2", "checked": false },
                { "id": 3, "optionText": "Option 3", "checked": false }] 
    }
]