import React, { useState, useEffect } from "react";
import { Transition } from "semantic-ui-react";

const CustomTransition = (props) => {
  const [trans, setTrans] = useState({
    hide: 1350,
    show: 1000,
    visible: false,
  });

  useEffect(() => {
    setTrans((prevState) => {
      return {
        ...prevState,
        visible: true,
      };
    });
  }, []);

  return (
    <Transition
      duration={{ hide: trans.hide, show: trans.show }}
      visible={trans.visible}
      {...props}
    />
  );
};

export default CustomTransition;
