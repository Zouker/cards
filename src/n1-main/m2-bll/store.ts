import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {loginReducer} from './reducers/login-reducer';
import {registerReducer} from './reducers/register-reducer';
import {error404Reducer} from './reducers/error404-reducer';
import {profileReducer} from './reducers/profile-reducer';
import {recoverPasswordReducer} from './reducers/recover-password-reducer';
import {enterNewPasswordReducer} from './reducers/enter-new-password-reducer';
import {testReducer} from './reducers/test-reducer';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    error404: error404Reducer,
    recoverPassword: recoverPasswordReducer,
    enterNewPassword: enterNewPasswordReducer,
    test: testReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>();