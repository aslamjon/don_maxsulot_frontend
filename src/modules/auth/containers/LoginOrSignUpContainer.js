import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import {get, isEmpty, isNull} from "lodash";
import {Link, useHistory} from "react-router-dom";
import {Col, Row} from "react-grid-system";
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
import {getCountry} from "../../../utils";
import CustomHeader from "../components/SelectCustomHader";
import CustomOption from "../components/SelectCustomOption";

const LoginOrSignUpContainer = ({
                                    loginOrSigUpRequest,
                                    getPhoneNumberRegexList,
                                    entities,
                                    phoneRegexList,
                                    setIsFocused,
                                    ...rest
                                }) => {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        prefix: "998",
        selected: {
            mask: "99 999 99 99"
        }
    });
    const history = useHistory();


    const loginOrSignUp = ({data: {phoneNumber} = {}, setError}) => {
        phoneNumber = phoneNumber.replace(/[\s()-]+/gi, "");
        setLoading(true);
        loginOrSigUpRequest({
            attributes: {phoneNumber: `+${state.prefix}${phoneNumber}`},
            formMethods: {setError, setLoading},
            cb: {
                success: ({registered}) => {
                    setLoading(false);
                    if (!registered)
                        history.push(`/auth/sign-up/${btoa(`+${state.prefix}${phoneNumber}`)}`);
                    else
                        history.push(`/auth/login/${btoa(`+${state.prefix}${phoneNumber}`)}`);
                },
            },
        });
    };

    const getPlaceHolder = useCallback(() => `${get(state, "selected.mask", "").replaceAll("9", "-")}`, [state.selected]);

    return (
        <>
            <Title medium lHeight="48" fs="32" className={"text-center "}>
                Welcome Back, Please <br/> log in to Get started
            </Title>
            <FormDemo
                formRequest={loginOrSignUp}
                footer={
                    <>
                        <Row>
                            <Col xs={12}>
                                <Link to={"/auth/forgot-phone-number"} className={"forgot-password"}> Forgot phone
                                    number ? </Link>
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
                                {loading ? <MiniLoader/> : "Next"}
                            </Button>
                        </Flex>
                    </>
                }
            >
                <Row>
                    <Col xs={12}>
                        <Label>Phone number</Label>
                    </Col>
                </Row>
                <Row nogutter className="auth-select__input">
                    <Col xs={9}>
                        <Field
                            type={"input-mask"}
                            name={"phoneNumber"}
                            label={"Phone number"}
                            hideLabel
                            params={{
                                required: true,
                                pattern: "",
                                maxLength: 30,
                                minLength: 5,
                            }}
                            property={{
                                disabled: false,
                                mask: get(state, "selected.mask", ""),
                                placeholder: getPlaceHolder(),
                                prefix: `+ ${state.prefix}`,
                                setIsFocused
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
        loginOrSigUpRequest: ({attributes, formMethods, cb}) =>
            dispatch({
                type: Actions.LOGIN_OR_SIGNUP.REQUEST,
                payload: {attributes, formMethods, cb},
            }),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginOrSignUpContainer);
