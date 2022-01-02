import React, { useState } from "react";
import Form from "../../../containers/Form/form";
import Button from "../../../components/elements/button";
import Title from "../../../components/elements/title";
import Flex from "../../../components/elements/flex";
import Icon from "../../../components/elements/icon";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import MiniLoader from "../../../components/loader/mini-loader";
import Actions from "../actions";

const LoginContainer = ({
  phone,
  loginRequest,
  saveSignInDataRequest,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const fields = [
    {
      id: 1,
      name: "password",
      label: "Password",
      type: "input",
      params: { required: true },
      property: { placeholder: "Enter password", type: "password" },
    },
  ];

  const login = ({ data, setError }) => {
    setLoading(true);
    loginRequest({
      attributes: { ...data, phoneNumber: phone },
      formMethods: { setLoading, setError },
      cb: {
        success: ({
          hasToken,
          phoneNumber,
          smsCode: { smsCodeId },
          password,
        }) => {
          if (!hasToken) {
            if (password) {
              saveSignInDataRequest(password);
            }
            history.push(
              `/auth/verification/${btoa(
                phoneNumber
              )}/${smsCodeId}?verificationType=${btoa("PHONE_NUMBER")}`
            );
          }
        },
      },
    });
  };
  return (
    <>
      <Title medium xl lHeight="48" className={"text-center mb-36"}>
        Welcome Back, Please <br /> log in to Get started
      </Title>
      <Form
        formRequest={login}
        fields={fields}
        params={{ required: true }}
        property={{ disabled: false }}
      >
        {({ errors }) => (
          <Flex justify={"space-between"}>
            <Button
              center
              className="backButton"
              lightSmBorder
              paddingTop={8}
              paddingBottom={8}
              bold
            >
              <Icon
                icon="icon-left-arrow"
                mainClassName="left-arrow"
                className="dark"
              />
              Back
            </Button>
            <Button
              center
              disabled={!isEmpty(errors)}
              type={"submit"}
              lightSmBorder
              paddingTop={8}
              paddingBottom={8}
            >
              {loading ? <MiniLoader /> : "Next"}
            </Button>
          </Flex>
        )}
      </Form>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
