import { combineReducers } from "redux";
import { registrationReducer, 
    activationReducer,
    loginReducer,passwordresetReducer,
    passwordresetConfirmReducer,
     } from "./authetication";
import { errorReducer } from "./errorReducer/errorReducer";

const rootReducer = combineReducers({
    registrationReducer,
    activationReducer,
    loginReducer,
    passwordresetReducer,
    passwordresetConfirmReducer,
    errorReducer
});
export default rootReducer;