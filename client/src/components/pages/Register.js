import React, { useContext, useState } from "react";
// import { useHistory } from "react-router";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../utils/useForm";
import { USER_REGISTER_UPDATE } from "../../query/user";
import CustomTransition from "../utils/CustomTransition";
import { authContext } from "../utils/context/context";

function Register(props) {
  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };
  const { values, onChangeHandler, onSubmitHandler } = useForm(
    initialValues,
    registerUser
  );

  const context = useContext(authContext);

  var [addUser, { loading }] = useMutation(USER_REGISTER_UPDATE, {
    update: (_, { data: { registerUser: userData } }) => {
      // history.push("/");
      context.login(userData);
      props.history.push("/");
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  const [errors, setErrors] = useState({});

  function registerUser() {
    addUser();
  }

  // .../api -> .../
  // const history = useHistory();

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
          <Form.Input
            error={
              errors.confirmPassword
                ? { content: errors.confirmPassword, pointing: "below" }
                : false
            }
            name="confirmPassword"
            id="confirmPassword"
            label="Re-enter password"
            type="password"
            value={values.confirmPassword || ""}
            placeholder="Your password here again"
            onChange={onChangeHandler}
          />
          <Form.Input
            error={
              errors.email
                ? { content: errors.email, pointing: "below" }
                : false
            }
            name="email"
            id="email"
            label="Email"
            type="email"
            value={values.email || ""}
            placeholder="Your email here"
            onChange={onChangeHandler}
          />
          <Button basic color="purple" fluid size="big">
            <Icon name="registered" /> Register
          </Button>
        </Form>
      </CustomTransition>
      {Object.keys(errors).length > 0 && (
        <Form error className="error">
          <Message
            error
            header="Register details"
            list={Object.values(errors).map((error) => error)}
            size="large"
            floating
          />
        </Form>
      )}
    </div>
  );
}

export default Register;
