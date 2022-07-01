import React from 'react';
import styles from './EnterNewPassword.module.css'
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {useFormik} from 'formik';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {setInfoTC} from '../../n1-main/m2-bll/reducers/set-new-password-reducer';
import {Navigate, useParams} from 'react-router-dom';
import error from '../Error.module.css'

export const SetNewPassword = () => {
    const dispatch = useAppDispatch()
    const isPassChanged = useAppSelector(state => state.setNewPassword.isPassChanged)
    const {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password must be more than 7 characters...'
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'The password and confirmation password do not match'
            }
            return errors;
        },
        onSubmit: values => {
            token && dispatch(setInfoTC({password: values.password, resetPasswordToken: token}))
        },
    })


    const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
        password: '',
        showPassword: false,
    });

    const [valuesConfirmPassword, setValuesConfirmPassword] = React.useState<StateConfirmPassword>({
        confirmPassword: '',
        showConfirmPassword: false,
    });

    const handleClickShowPassword = () => {
        setValuesPassword({
            ...valuesPassword,
            showPassword: !valuesPassword.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValuesConfirmPassword({
            ...valuesConfirmPassword,
            showConfirmPassword: !valuesConfirmPassword.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isPassChanged) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.title}>Create new password</div>
                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">New password</InputLabel>
                    <Input
                        id="password"
                        type={valuesPassword.showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder={'New password'}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className={styles.input}
                        autoComplete="on"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {valuesPassword.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.password && formik.touched.password &&
                    <div className={error.error}>{formik.errors.password}</div>}

                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Confirm new password</InputLabel>
                    <Input
                        id="confirmPassword"
                        type={valuesConfirmPassword.showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder={'Confirm new password'}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        className={styles.input}
                        autoComplete="on"

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {valuesConfirmPassword.showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                    <div className={error.error}>{formik.errors.confirmPassword}</div>}
                <div className={styles.instructions}>Create new password and we will send you further instructions to
                    email
                </div>
                <Button variant={'contained'} type="submit">Create new password</Button>
            </form>
        </div>
    );
};

// types
type FormikErrorType = {
    password?: string
    confirmPassword?: string
}

type StatePassword = {
    password: string;
    showPassword: boolean;
}

type StateConfirmPassword = {
    confirmPassword: string;
    showConfirmPassword: boolean;
}