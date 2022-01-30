import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoginContainer from "../containers/LoginContainer";

const LoginPage = ({ ...rest }) => {
  const { phone } = useParams();

  const LoginPageStyled = styled.div`
    .backButton {
      .left-arrow {
        position: absolute;
        left: 25px;
      }
    }
  `;

  return (
    <LoginPageStyled>
      <LoginContainer username={atob(phone)} {...rest} />
    </LoginPageStyled>
  );
};

export default LoginPage;
