import "assets/compiled/css/auth.css";
import { useLoginUserMutation } from "features/auth/authApi";
import { setLoginUser } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


type FormData = {
  email: string,
  password: string,
  remember: boolean
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginUser, { data, isSuccess }] = useLoginUserMutation()
  const initState = {
    email: 'adm@gmail.com',
    password: '123',
    remember: false
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: initState,
    // errors: error
  })

  const onSubmit = (values: FormData) => {
    loginUser(values)
  };


  useEffect(() => {
    if (isSuccess) {
      if (data) {
        dispatch(setLoginUser(data))
        navigate('/')
      }
    }
  }, [isSuccess])
  return (
    
    <div id="auth">
      <div className="row h-100 border align-items-center ">

        <Col 
        // className="border shadow-sm"
          xs={{ span: 12 }}
          md={{ offset: 2, span: 8 }}
          lg={{ offset: 4, span: 4 }}
        >
          <Card id="auth-left" className="border shadow-sm">
            <h4 className="auth-title">Log in.</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                className="form-group position-relative has-icon-left mb-4">
                <Form.Control
                  className="form-control-xl"
                  type="email"
                  {...register('email', { required: "This Feild Is required" })}
                />
                <div className="form-control-icon">
                  <i className="bi bi-person"></i>
                </div>
                {errors.email && (
                  <Form.Text className="text-danger">
                    {errors.email.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group
                className="form-group position-relative has-icon-left mb-4">
                <Form.Control
                  className="form-control-xl"
                  type="password"
                  {...register('password', { required: "This Feild Is required" })}
                />
                <div className="form-control-icon">
                  <i className="bi bi-shield-lock"></i>
                </div>
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Button type="submit" className="btn btn-primary btn-block btn-lg shadow-lg mt-5">Login</Button>
            </Form>
          </Card>
        </Col>
        {/* <div className="col-lg-7 d-none d-lg-block">
          <div id="auth-right"></div>
        </div> */}
      </div>
    </div>
  )
}

export default Login