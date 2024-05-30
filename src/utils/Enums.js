export const Action = Object.freeze({
    NEW_RECORD : 'new',
    MODIFY_RECORD : 'modify',
    DISPLAY_RECORD : 'display',
    DELETE_RECORD : 'delete'
})

export const Click = Object.freeze({
    CLOSE : 'close',
    SUBMIT : 'submit'
})

export const QuestionStatus = Object.freeze({
    NOT_VISITED : 'NOT_VISITED',
    VISITED : 'VISITED',
    ANSWERED : 'ANSWERED',
    NOT_ANSWERED : 'NOT_ANSWERED',
    MARKED : 'MARKED'
})

export const ExamStatus = Object.freeze({
    PENDING : 'PENDING',
    IN_PROGRESS : 'IN_PROGRESS',
    COMPLETED : 'COMPLETED',
    BLOCKED : 'BLOCKED'
})

export default {Action};
