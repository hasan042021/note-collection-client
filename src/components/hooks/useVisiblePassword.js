import React, { useState } from "react";

const useVisiblePassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return {
    passwordShown,
    togglePassword,
  };
};

export default useVisiblePassword;
