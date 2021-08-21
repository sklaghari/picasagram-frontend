import { GET_ERRORS } from "../../types/error";
const initialState = {
        msg:{},
        status:null
}
export const errorReducer = (state= initialState, action) => {
const {type, payload} = action
switch (type) {
    case GET_ERRORS:
        return {
            msg : payload.msg,
            status: payload.status
        }
    default:
        return {state}
}
}