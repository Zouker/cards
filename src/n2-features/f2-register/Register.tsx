import React from 'react';
import styles from './Register.module.css'
import {Link, Navigate} from 'react-router-dom';
import {registerTC} from '../../n1-main/m2-bll/reducers/register-reducer';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {useFormik} from 'formik';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import error from '../Error.module.css'

export const Register = () => {
    const dispatch = useAppDispatch()
    const isRegistered = useAppSelector(state => state.register.isRegistered)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
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
            dispatch(registerTC(values))
            formik.resetForm()
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

    if (isRegistered) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.title}>Sign Up</div>
                <FormControl variant="standard">
                    <InputLabel htmlFor="component-simple">Email</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={'Email'}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className={styles.input}

                    />
                </FormControl>
                {formik.errors.email && formik.touched.email &&
                    <div className={error.error}>{formik.errors.email}</div>}

                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="password"
                        type={valuesPassword.showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder={'Password'}
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
                    <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                    <Input
                        id="confirmPassword"
                        type={valuesConfirmPassword.showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder={'Confirm password'}
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
                <Button variant={'contained'} type="submit">Register</Button>
                Already have an account?
                <Link to={'/login'}>Sign In</Link>
            </form>
        </div>
    );
};

// types
type FormikErrorType = {
    email?: string
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