import React from 'react';
import styles from './Register.module.css'
import {Link, Navigate} from 'react-router-dom';
import {registerTC} from '../../n1-main/m2-bll/reducers/register-reducer';
import {AppRootStateType, useAppDispatch} from '../../n1-main/m2-bll/store';
import {useFormik} from 'formik';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {useSelector} from 'react-redux';
import {Visibility, VisibilityOff} from '@mui/icons-material';


export const Register = () => {
    const dispatch = useAppDispatch()
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)

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


    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
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
            <form className={styles.register} onSubmit={formik.handleSubmit}>
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
                    <div style={{color: 'red'}}>{formik.errors.email}</div>}

                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="password"
                        type={values.showPassword ? 'text' : 'password'}
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
                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.password && formik.touched.password &&
                    <div style={{color: 'red'}}>{formik.errors.password}</div>}

                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                    <Input
                        id="confirmPassword"
                        type={values.showPassword ? 'text' : 'password'}
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
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                    <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>}
                <Button variant={'contained'} type="submit">Register</Button>
                Already have an account?
                <Link to={'login'}>Sign In</Link>
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

type State = {
    password: string;
    showPassword: boolean;
}
