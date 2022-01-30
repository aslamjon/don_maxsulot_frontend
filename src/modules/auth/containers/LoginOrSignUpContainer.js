import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get, head, isEqual, upperCase } from "lodash";
import { Link, useHistory } from "react-router-dom";
import { Col, Row } from "react-grid-system";
import Button from "../../../components/elements/button";
import Title from "../../../components/elements/title";
import Actions from "../actions";
import ApiActions from "../../../services/api/actions";
import MiniLoader from "../../../components/loader/mini-loader";
import Flex from "../../../components/elements/flex";
import Icon from "../../../components/elements/icon";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import PhoneNumberRegex from "../../../schema/PhoneNumberRegex";
import Normalizer from "../../../services/normalizer";
import Label from "../../../components/elements/label";
import {
  getMaskFromPhoneNumber,
  getPlaceholderFromPhoneNumber,
  showError2
} from "../../../utils";

const LoginOrSignUpContainer = ({
  loginOrSigUpRequest,
  entities,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [prefix, setPrefix] = useState("998");
  const history = useHistory();

  const loginOrSignUp = ({ data:{ username }, setError }) => {
    setLoading(true);
    loginOrSigUpRequest({
      attributes: { username },
      formMethods: { setError, setLoading },
      cb: {
        success: ({ registered, hasPassword }) => {
          setLoading(false);
          if (!registered) {
            showError2("Username xato. Kirish mumkin emas Oka")
            // history.push(`/noaccess`);
          } else {
            if (registered && hasPassword) {
              history.push(`/auth/login/${btoa(username)}`);
            }
          }
        },
      },
    });
  };

  const getValueFromField = (data, name) => {
    if (name == "prefix") {
      setPrefix(data);
    }
  };

  return (
    <>
      <Title medium lHeight="48" fs="32" className={"text-center "}>
        Welcome Back, Please <br /> log in to Get started
      </Title>

      <FormDemo
        formRequest={loginOrSignUp}
        getValueFromField={getValueFromField}
        footer={
          <>
            <Row>
              <Col xs={12}>
                <Link to={"#"} className={"forgot-password"}> Forgot phone number ? </Link>
              </Col>
            </Row>
          
            <Flex justify={"space-between"}>
              <Button center="1" className="backButton" lightSmBorder lightButton>
                <Icon
                  icon="icon-left-arrow"
                  className="dark"
                  mainClassName="left-arrow"
                />
                Back
              </Button>
              <Button
                center="1"
                type={"submit"}
                lightSmBorder
                success
                className="nextButton"
              >
                {loading ? <MiniLoader /> : "Next"}
              </Button>
            </Flex>
          </>
        }
      >
        <Row>
          <Col xs={12}>
            <Label>Username</Label>
          </Col>
        </Row>
        <Row nogutter className="auth-select__input">
          <Col xs={12}>
            <Field
              type={"input"}
              name={"username"}
              label={"Username"}
              hideLabel
              params={{
                required: true,
                pattern: "",
                maxLength: 30,
                minLength: 5,
              }}
              property={{
                disabled: false,
                placeholder: "Username",
              }}
            />
          </Col>
        </Row>
      </FormDemo>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
  };
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
