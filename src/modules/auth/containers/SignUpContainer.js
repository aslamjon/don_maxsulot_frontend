import React, { useState } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import Actions from "../actions";
import Flex from "../../../components/elements/flex";
import Button from "../../../components/elements/button";
import MiniLoader from "../../../components/loader/mini-loader";
import Title from "../../../components/elements/title";
import Form from "../../../containers/Form/form";
import { useHistory } from "react-router-dom";
import Icon from "../../../components/elements/icon";

const SignUpContainer = ({
  phone,
  sendSmsForSignUpRequest,
  saveSignUpDataRequest,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const sendSmsCode = ({ data, setError }) => {
    setLoading(true);
    sendSmsForSignUpRequest({
      attributes: { ...data, username: phone },
      formMethods: { setError, setLoading },
      cb: {
        success: ({ username, smsCodeId, prePassword, password }) => {
          if (password && prePassword) {
            saveSignUpDataRequest({ password, prePassword });
          }
          history.push(
            `/auth/verification/${btoa(
              username
            )}/${smsCodeId}?verificationType=${btoa("SIGN_UP")}`
          );
        },
      },
    });
  };
  const fields = [
    {
      id: 1,
      name: "password",
      label: "Password",
      type: "input",
      params: { required: true },
      property: { placeholder: "Enter password", type: "password" },
    },
    {
      id: 2,
      name: "prePassword",
      label: "Confirm password",
      type: "input",
      params: { required: true },
      property: { placeholder: "Enter confirm password", type: "password" },
    },
  ];

  return (
    <>
      <Title medium xl lHeight="40" className={"text-center mb-36"}>
        Registration
      </Title>
      <Form
        formRequest={sendSmsCode}
        fields={fields}
        params={{ required: true }}
        property={{ disabled: false }}
      >
        {({ errors }) => (
          <Flex justify={"space-between"}>
            <Button
              onClick={() => history.push("/auth")}
              center='1'
              className="backButton"
              bold='1'
              paddingtop={5}
              paddingbottom={5}
            >
              <Icon
                icon="icon-left-arrow"
                mainClassName="left-arrow"
                className="dark"
              />
              Back
            </Button>
            <Button disabled={!isEmpty(errors)} success='1' center='1' paddingtop={5}
              paddingbottom={5} type={"submit"}>
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
    sendSmsForSignUpRequest: ({ attributes, formMethods, cb }) =>
      dispatch({
        type: Actions.SEND_SMS_FOR_SIGNUP.REQUEST,
        payload: { attributes, formMethods, cb },
      }),
    saveSignUpDataRequest: (data) =>
      dispatch({
        type: Actions.SAVE_SIGN_UP_PASSWORD.SUCCESS,
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
