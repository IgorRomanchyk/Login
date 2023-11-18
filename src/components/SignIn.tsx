import { useState, useEffect } from "react"
import Avatar from '@mui/material/Avatar';
import LoadingButton from "@mui/lab/LoadingButton"
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Alert from "@mui/material/Alert"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Form, FormikProvider, useFormik } from 'formik'
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setImages } from "../redux/imagesSlice";
import { useFetchImagesQuery } from "../redux/imagesApi";
import postLogin from '../api/requests/postLogin';

const defaultTheme = createTheme();

export default function SignIn() {
  const [err, setErr] = useState(null)
  const [remember, setRemember] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const SignInSchema = Yup.object().shape({
    username: Yup.string().required('Поле обязательно'),
    password: Yup.string().required('Поле обязательно')
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: () => {
      onSubmit()
    },
  })

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    getFieldProps,
  } = formik

  const {data, error, isLoading} = useFetchImagesQuery(20)


  useEffect(() => {
    const token = localStorage.getItem("jwt") || sessionStorage.getItem('jwt')
    if (token) {
      navigate('/images', { replace: true })
    }
  }, [])
  
  const onSubmit = () => {
    dispatch(setImages(data.photos))
    postLogin({
      username: values.username,
      password: values.password
    })
    .then((data) => {
      setErr(null)
      dispatch(setUser(data))
      if (remember) {
        localStorage.setItem('jwt', data.token)
      } else {
        sessionStorage.setItem('jwt', data.token)
      }
      navigate('/images', { replace: true })
    })
    .catch(err => {
      setErr(err.message)
      console.log(err)
    })
    .finally(() => {
      setSubmitting(false)
     
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="username"
                  label="username"
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  onClick={() => setRemember(prev => !prev)}
                />
                {err && !isSubmitting &&  <Alert severity="error">{err}</Alert>}
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </LoadingButton>
              </Box>
            </Box>
          </Container>
        </Form>
      </FormikProvider>
    </ThemeProvider>
  );
}