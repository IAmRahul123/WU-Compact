import { all } from "redux-saga/effects";
import watchTheme from "./themeSaga";

export function* rootSaga(){
    yield all([watchTheme()])
}

