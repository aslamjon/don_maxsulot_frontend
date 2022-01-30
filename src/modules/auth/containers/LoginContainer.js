import React, { useState } from "react";
import Button from "../../../components/elements/button";
import Title from "../../../components/elements/title";
import Flex from "../../../components/elements/flex";
import Icon from "../../../components/elements/icon";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MiniLoader from "../../../components/loader/mini-loader";
import Actions from "../actions";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import { Col, Row } from "react-grid-system";
import { showMessage, showError2 } from "../../../utils";

const LoginContainer = ({
  username,
  loginRequest,
  saveSignInDataRequest,
  checkAuth,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const login = ({ data, setError }) => {
    setLoading(true);
    loginRequest({
      attributes: { ...data, username },
      formMethods: { setLoading, setError },
      cb: {
        fail: ({
          message,
          ...props
        }) => {
          showError2(message);
        },
        success: ({
          token,
          ...other
        }) => {
          // showMessage(message);
          console.log(other, "success")
          if (token) {
            checkAuth(token);
            history.push(`/`);
          }
        },
      },
    });
  };
  return (
    <>
      <Title medium lHeight="48" fs="32" className={"text-center mb-100"}>
        Welcome Back, Please <br /> log in to Get started
      </Title>
      <FormDemo
        formRequest={login}
        footer={
          <Flex justify={"space-between"}>
            <Button
              center
              className="backButton"
              lightSmBorder
              lightButton
              onCLick={() => history.push("/auth")}
            >
              <Icon
                icon="icon-left-arrow"
                mainClassName="left-arrow"
                className="dark"
              />
              Back
            </Button>
            <Button center type={"submit"} className="nextButton">
              {loading ? <MiniLoader /> : "Next"}
            </Button>
          </Flex>
        }
      >
        <Field
          type={"input"}
          label={"Password"}
          name={"password"}
          property={{ placeholder: "**********", type: "password" }}
          params={{ required: true }}
        />
        <Row>
          <Col xs={12}>
            <Link to={"#"} className={"forgot-password"}>
              Forgot password ?
            </Link>
          </Col>
        </Row>
      </FormDemo>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: Actions.LOGIN.REQUEST,
        payload: { attributes, formMethods, cb },
      });
    },
    saveSignInDataRequest: (data) =>
      dispatch({
        type: Actions.SAVE_SIGN_IN_PASSWORD.SUCCESS,
        payload: data,
      }),
    checkAuth: (token = null) =>
      dispatch({
        type: Actions.CHECK_AUTH.REQUEST,
        payload: { token },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
