
function getCurrentExam() {
    let exam = JSON.parse(sessionStorage.getItem('current_exam'));
    const startTime = exam?.startTime;

    if(startTime) {
        exam = {...exam, startTime : new Date(Date.parse(exam.startTime))}
    }
    
    return exam;
}

function setCurrentExam(exam) {
    sessionStorage.setItem('current_exam', JSON.stringify(exam));
}

const SessionService = {
    getCurrentExam,
    setCurrentExam
}

export default SessionService;