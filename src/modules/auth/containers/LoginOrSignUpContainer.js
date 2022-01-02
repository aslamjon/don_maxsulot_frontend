import React, { useState } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";
import Form from "../../../containers/Form/form";
import Button from "../../../components/elements/button";
import Title from "../../../components/elements/title";
import Actions from "../actions";
import MiniLoader from "../../../components/loader/mini-loader";
import Flex from "../../../components/elements/flex";
import Icon from "../../../components/elements/icon";

const LoginOrSignUpContainer = ({ loginOrSigUpRequest, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const fields = [
    {
      id: 1,
      name: "username",
      label: "Username",
      type: "input",
      params: { required: true },
      property: { placeholder: "Enter Username", type: "text" },
    },
  ];
  const loginOrSignUp = ({ data: { username } = {}, setError }) => {
    setLoading(true);
    loginOrSigUpRequest({
      attributes: { username },
      formMethods: { setError, setLoading },
      cb: {
        success: ({ data: { registered, hasPassword } = {}, username }) => {
          setLoading(false);
          if (!registered) {
            history.push(`/auth/sign-up/${btoa(username)}`);
          } else {
            if (registered && hasPassword) {
              history.push(`/auth/login/${btoa(username)}`);
            }
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
        formRequest={loginOrSignUp}
        fields={fields}
        params={{ required: true }}
        property={{ disabled: false }}
      >
        {({ errors }) => (
          <Flex justify={"space-between"}>
            <Button
              center="1"
              className="backButton"
              lightsmborder="1"
              paddingtop={8}
              paddingbottom={8}
              bold="1"
            >
              <Icon
                icon="icon-left-arrow"
                className="dark"
                mainClassName="left-arrow"
              />
              Back
            </Button>
            <Button
              center="1"
              disabled={!isEmpty(errors)}
              type={"submit"}
              lightsmborder="1"
              paddingtop={8}
              paddingbottom={8}
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
    loginOrSigUpRequest: ({ attributes, formMethods, cb }) =>
      dispatch({
        type: Actions.LOGIN_OR_SIGNUP.REQUEST,
        payload: { attributes, formMethods, cb },
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginOrSignUpContainer);
