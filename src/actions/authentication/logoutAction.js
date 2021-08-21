import { logoutTypes } from "../../types/authetication"

export const logout = () => dispatch => {
dispatch({
    type: logoutTypes.LOGOUT
})
}