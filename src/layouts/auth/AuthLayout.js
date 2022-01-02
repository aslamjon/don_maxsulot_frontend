import React from "react";
import styled from "styled-components";
import Title from "../../components/elements/title";
import Progressbar from "../../components/progressbar";
import Text from "../../components/elements/text";
import authBgImg from "../../assets/images/auth-left-image-full.png";
import logo from "../../assets/images/dark-logo.svg";
import Toastify from "../../components/toastify";

const StyledAuthLayout = styled.div`
  display: flex;
  height: 100vh;
  .auth {
    &__left {
      width: 47%;
      background-image: url(${authBgImg});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center/cover;
      overflow: hidden;
      position: relative;
      &__bottom {
        position: absolute;
        bottom: 80px;
        text-align: center;
        width: 80%;
        z-index: 1;
        left: 50%;
        transform: translateX(-50%);
      }
      &__title {
        margin-bottom: 15px;
      }
      &__text {
        color: #e4d7cf;
        margin-top: 6px;
      }
      &__progressbar {
        width: 200px;
        margin: 0 auto;
        height: 4px;
        margin-top: 60px;
      }
    }

    &__right {
      width: 53%;
      padding: 60px;
      position: relative;
      .logo {
        position: absolute;
        cursor: pointer;
        top: 60px;
        left: 60px;
      }
      &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -60%);
        width: 450px;
      }
    }
  }
`;
const AuthLayout = ({ children, ...props }) => {
  return (
    <StyledAuthLayout {...props}>
      <Toastify />
      <div className="auth__left">
        <div className="auth__left__bottom">
          <Title light lg semiBold className={"auth__left__title"}>
            Jonny Wick
          </Title>
          <Text lg light>
            Product Designer
          </Text>
          <Text lg className={"auth__left__text"}>
            Work experience 8 years
          </Text>
          <Progressbar
            percent={39}
            strokeWidth={2}
            trailWidth={2}
            className={"auth__left__progressbar"}
          />
        </div>
      </div>
      <div className="auth__right">
        {/* <img className={"logo"} src={logo} alt="logo" /> */}
        <div className="auth__right__content">{children}</div>
      </div>
    </StyledAuthLayout>
  );
};

export default AuthLayout;
