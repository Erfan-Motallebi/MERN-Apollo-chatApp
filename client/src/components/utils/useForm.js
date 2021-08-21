import { useState } from "react";

export const useForm = (initialStates = {}, cb) => {
  const [values, setValues] = useState(initialStates);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    cb();
    //   setErrors({});
  };

  return {
    onSubmitHandler,
    onChangeHandler,
    values,
  };
};
