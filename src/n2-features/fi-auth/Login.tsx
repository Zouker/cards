import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import {AppRootStateType, useAppDispatch} from "../../n1-main/m2-bll/store";
import {useFormik} from "formik";
import s from './Login.module.css'
import {Paper} from "@mui/material";
import {loginTC} from "../../n1-main/m2-bll/reducers/login-reducer";
import {ErrorSnackbar} from "../../n1-main/m1-ui/common/ErrorSnackbar/ErrorSnackbar";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch=useAppDispatch();
    const isLogin=useSelector<AppRootStateType,boolean>(state => state.login.isLogin);

    const validate = (values:FormikErrorType) => {
        const errors: FormikErrorType= {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length <=7) {
            errors.password = 'symbol of password should > 7';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            // alert(JSON.stringify(values)); //это для теста что все работает)
            dispatch(loginTC(values));
            formik.resetForm();
        },

    })
    if (isLogin){
        return <Navigate to ={'/profile'}/>
    }


    return <Grid container justifyContent={'center'}>

        {/*//оборачиваем наши все формы тегом form..*/}
        <form onSubmit={formik.handleSubmit}>
             <Paper className={s.card} elevation={3}>
            <FormControl>
                <p className={s.titleForm}>Sign In</p>
                <FormGroup>
                    <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />

                    {formik.touched.email && formik.errors.email &&  <div style={{color:"red"}}>{formik.errors.email}</div> }

                    <TextField type="password" label="Password" {...formik.getFieldProps('password')}
                               margin="normal"
                    />
                    {formik.touched.password && formik.errors.password &&  <div style={{color:"red"}}>{formik.errors.password}</div> }
                    <FormControlLabel label={'Remember me'} control={<Checkbox  {...formik.getFieldProps('rememberMe')}
                                                                                checked={formik.values.rememberMe}/> //благодаря этой строке чекбокс тоже сбрасывается
                    }/>
                    {formik.touched.password && formik.errors.password &&  <div style={{color:"red"}}>{formik.errors.password}</div> }

                    <Button className={s.btn} type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                    <p className={s.text}>Don’t have an account?</p>
                    <Link  className={s.textLink} to={'/register'}>Sign Up</Link>

                    <ErrorSnackbar/>
                </FormGroup>
            </FormControl>
             </Paper>
        </form>

    </Grid>
}


