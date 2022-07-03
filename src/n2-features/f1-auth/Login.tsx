import React from 'react';
import styles from './Login.module.css'
import {Link, Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../n1-main/m2-bll/store';
import {useFormik} from 'formik';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {loginTC} from '../../n1-main/m2-bll/reducers/auth-reducer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import error from '../../utils/Error.module.css'

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false

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
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    })

    const [valuesPassword, setValuesPassword] = React.useState<StatePassword>({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValuesPassword({
            ...valuesPassword,
            showPassword: !valuesPassword.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isLogin) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.title}>Sign In</div>
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


                <FormControlLabel label={'Remember me'}
                                  control={<Checkbox  {...formik.getFieldProps('rememberMe')}
                                                      checked={formik.values.rememberMe}/>
                                  }/>
                <Button variant={'contained'} type="submit">Login</Button>
                Don’t have an account?
                <Link className={styles.textLink} to={'/register'}>Sign Up</Link>
            </form>
        </div>
    );
};

// types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: false
}

type StatePassword = {
    password: string;
    showPassword: boolean;
}
