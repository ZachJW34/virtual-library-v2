import { combineReducers } from "redux";
import { router } from "./history";
import { auth, AuthState } from "./auth";

export type State = {
    auth: AuthState,
    router: any
}

export const rootReducer = combineReducers({
    router,
    auth
});
