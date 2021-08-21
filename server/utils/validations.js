module.exports.userValidator = (username, password, confirmPassword, email) => {
  const errors = {};
  if (username.trim() === "") {
    errors["username"] = "Username is empty.";
  } else {
    const userRegEX =
      /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/g;
    if (!username.match(userRegEX)) {
      errors["username"] = "A real username must be provided";
    }
  }
  if (password === "") {
    errors["password"] = "Password is empty.";
  } else if (password !== confirmPassword) {
    errors["confirmPassword"] = "Password fields must match";
  }

  if (email.trim() === "") {
    errors["email"] = "Email is empty.";
  } else {
    const emailRegEX =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!email.match(emailRegEX)) {
      errors["email"] = "A real email must be provided";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};

module.exports.loginValidator = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors["username"] = "Username is empty.";
  } else {
    const userRegEX =
      /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/g;
    if (!username.match(userRegEX)) {
      errors["username"] = "A real username must be provided";
    }
  }
  if (password === "") {
    errors["password"] = "Password is empty.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1,
  };
};
