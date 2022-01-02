import React from "react";
import styled from "styled-components";
import LoginOrSignUpContainer from "../containers/LoginOrSignUpContainer";

const LoginOrSignUpPageStyled = styled.div`
  .backButton {
    .left-arrow {
      position: absolute;
      left: 25px;
    }
  }
`;

const LoginOrSignUpPage = (props) => {
  return (
    <LoginOrSignUpPageStyled {...props}>
      <LoginOrSignUpContainer {...props} />
    </LoginOrSignUpPageStyled>
  );
};

export default LoginOrSignUpPage;
