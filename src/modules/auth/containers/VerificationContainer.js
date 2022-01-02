import React, { useState } from "react";
import { connect } from "react-redux";
import { get, isEmpty, isEqual } from "lodash";
import Title from "../../../components/elements/title";
import Form from "../../../containers/Form/form";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../../components/elements/button";
import MiniLoader from "../../../components/loader/mini-loader";
import Actions from "../actions";
import Flex from "../../../components/elements/flex";
import Text from "../../../components/elements/text";
// import CountdownTimer from "../../../components/countdown-timer";
import Icon from "../../../components/elements/icon";
import { getPhoneWithMask, getQueryParams } from "../../../utils";

const VerificationContainer = ({
  phone,
  smsCodeId,
  signUpRequest,
  sign_up_data,
  sendSmsForSignUpRequest,
  checkAuth,
  sign_in_data,
  signInWithPhoneNumber,
  sendSmsForLoginRequest,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { search } = useLocation();
  const verificationType = getQueryParams(search, "verificationType");
  console.log(verificationType);

  const fields = [
    {
      id: 1,
      name: "smsCode",
      label: "Enter sms code",
      type: "verification",
      params: { required: true },
    },
  ];

  const request = ({ data, setError }) => {
    if (isEqual(verificationType, "SIGN_UP")) {
      signUpRequest({
        attributes: { ...data, ...sign_up_data, phoneNumber: phone, smsCodeId },
        formMethods: { setLoading, setError },
        cb: {
          success: ({ accessToken }) => {
            if (accessToken) {
              checkAuth(accessToken);
              history.push(`/`);
            }
          },
        },
      });
    }
    if (isEqual(verificationType, "PHONE_NUMBER")) {
      signInWithPhoneNumber({
        attributes: {
          ...data,
          password: sign_in_data,
          phoneNumber: phone,
          verificationType,
          smsCodeId,
        },
        formMethods: { setLoading, setError },
        cb: {
          success: ({ accessToken }) => {
            if (accessToken) {
              checkAuth(accessToken);
              history.push(`/`);
            }
          },
        },
      });
    }
  };

  const resendSmsCode = () => {
    setLoading(true);
    if (isEqual(verificationType, "SIGN_UP")) {
      sendSmsForSignUpRequest({
        attributes: { ...sign_up_data, phoneNumber: phone },
        formMethods: { setLoading },
        cb: {
          success: ({ phoneNumber, smsCodeId }) => {
            history.replace(
              `/auth/verification/${btoa(
                phoneNumber
              )}/${smsCodeId}?verificationType=${btoa("SIGN_UP")}`
            );
          },
        },
      });
    }
    if (isEqual(verificationType, "PHONE_NUMBER")) {
      sendSmsForLoginRequest({
        attributes: { password: sign_in_data, phoneNumber: phone },
        formMethods: { setLoading },
        cb: {
          success: ({
            hasToken,
            phoneNumber,
            smsCode: { smsCodeId },
            password,
          }) => {
            if (!hasToken) {
              history.replace(
                `/auth/verification/${btoa(
                  phoneNumber
                )}/${smsCodeId}?verificationType=${btoa("PHONE_NUMBER")}`
              );
            }
          },
        },
      });
    }
  };

  return (
    <>
      <Title medium lg className={"text-center mb-36"}>
        Verification
      </Title>
      <Text className="messageAboutSending">
        We have to sent the code verification to <br />
        Your Mobile number {getPhoneWithMask(phone)}
      </Text>
      {/* <CountdownTimer resend={resendSmsCode} /> */}
      <Form
        formRequest={request}
        fields={fields}
        params={{ required: true }}
        property={{ disabled: false }}
      >
        {({ errors }) => (
          <Flex justify={"space-between"}>
            <Button
              center="1"
              onClick={() => history.push("/auth")}
              center
              className="backButton"
              lightSmBorder
              paddingTop={8}
              paddingBottom={8}
              bold
            >
              <Icon
                icon="icon-left-arrow"
                mainClassName="left-in-button"
                className="dark"
              />
              Back
            </Button>
            <Button
              center
              disabled={!isEmpty(errors)}
              success="1"
              type={"submit"}
              lightSmBorder
              paddingTop={8}
              paddingBottom={8}
            >
              {loading ? <MiniLoader /> : "Next"}{" "}
            </Button>
          </Flex>
        )}
      </Form>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    sign_up_data: get(state, "auth.sign_up_data", null),
    sign_in_data: get(state, "auth.sign_in_data", null),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUpRequest: ({ attributes, formMethods, cb }) =>
      dispatch({
        type: Actions.SIGN_UP.REQUEST,
        payload: { attributes, formMethods, cb },
      }),
    signInWithPhoneNumber: ({ attributes, formMethods, cb }) =>
      dispatch({
        type: Actions.SEND_SMS_FOR_LOGIN_OR_FORGOT_PASSWORD.REQUEST,
        payload: { attributes, formMethods, cb },
      }),
    sendSmsForSignUpRequest: ({ attributes, formMethods, cb }) =>
      dispatch({
        type: Actions.SEND_SMS_FOR_SIGNUP.REQUEST,
        payload: { attributes, formMethods, cb },
      }),
    sendSmsForLoginRequest: ({ attributes, formMethods, cb }) => {
      dispatch({
        type: Actions.LOGIN.REQUEST,
        payload: { attributes, formMethods, cb },
      });
    },

    checkAuth: (token = null) =>
      dispatch({
        type: Actions.CHECK_AUTH.REQUEST,
        payload: { token },
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationContainer);
