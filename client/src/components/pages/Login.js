import React, { useState, useContext } from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import { USER_LOGIN_QUERY } from "../../query/user";
import { useMutation } from "@apollo/client";
import { useForm } from "../utils/useForm";
import CustomTransition from "../utils/CustomTransition";
import { authContext } from "../utils/context/context";

function Login(props) {
  const [errors, setErrors] = useState({});

  const contextAuth = useContext(authContext);

  const initialValues = {
    username: "",
    password: "",
  };
  const { values, onChangeHandler, onSubmitHandler } = useForm(
    initialValues,
    login
  );

  const [userLogin, { loading }] = useMutation(USER_LOGIN_QUERY, {
    update(_, { data: { login } }) {
      props.history.push("/");
      contextAuth.login(login);
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function login() {
    userLogin();
  }

  return (
    <div>
      <CustomTransition>
        <Form
          className={`form-control ${loading ? " loading" : ""}`}
          size="large"
          onSubmit={onSubmitHandler}
        >
          <Form.Input
            error={
              errors.username
                ? { content: errors.username, pointing: "below" }
                : false
            }
            name="username"
            id="username"
            label="Username"
            value={values.username || ""}
            type="text"
            onChange={onChangeHandler}
            placeholder="Your username here"
          />
          <Form.Input
            error={
              errors.password
                ? { content: errors.password, pointing: "below" }
                : false
            }
            name="password"
            id="password"
            label="Password"
            type="password"
            value={values.password || ""}
            placeholder="Your password here"
            onChange={onChangeHandler}
          />

          <Button basic color="purple" fluid size="big">
            <Icon name="sign in" /> Sign-in
          </Button>
        </Form>
      </CustomTransition>
      {/* </Transition> */}
      {Object.keys(errors).length > 0 && (
        <Form error className="error">
          <Message
            error
            header="Login details"
            list={Object.values(errors).map((error) => error)}
            size="large"
            floating
          />
        </Form>
      )}
    </div>
  );
}

export default Login;
