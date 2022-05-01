import React, {useState} from "react";
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import Actions from "../actions";
import Flex from "../../../components/elements/flex";
import Button from "../../../components/elements/button";
import MiniLoader from "../../../components/loader/mini-loader";
import Title from "../../../components/elements/title";
import {useHistory} from "react-router-dom";
import Icon from "../../../components/elements/icon";
import {showError} from "../../../utils";
import Field from "../../../containers/Form/field";
import FormDemo from "../../../containers/Form/form-demo";
import ApiActions from "../../../services/api/actions";

const SignUpContainer = ({
                             phone,
                             sendSmsForSignUpRequest,
                             saveSignUpDataRequest,
                             request,
                             checkAuth,
                             saveToken,
                             ...rest
                         }) => {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        firstField: true,
        secondField: true,
    });

    const history = useHistory();

    const sendSmsCode = ({data, setError}) => {
        setLoading(true);
        request({
            attributes: {...data, phoneNumber: phone},
            url: "auth/v1/auth/sign-up",
            method: "post",
            cb: {
                success: ({ accessToken, ...other }) => {
                    setLoading(false);
                    if (accessToken) {
                        saveToken({ accessToken, ...other });
                        checkAuth(accessToken);
                        history.push(`/`);
                    }
                },
                fail: (e) => {
                    showError(e);
                    setLoading(false);
                }
            }
        })
        // sendSmsForSignUpRequest({
        //   attributes: {...data, phoneNumber: phone},
        //   formMethods: {setError, setLoading},
        //   cb: {
        //     success: ({phoneNumber, smsCodeId, prePassword, password}) => {e
        //       // if (password && prePassword) {
        //       //   saveSignUpDataRequest({password, prePassword});
        //       // }
        //       // history.push(
        //       //     `/auth/verification/${btoa(
        //       //         phoneNumber
        //       //     )}/${smsCodeId}/${btoa("none")}/${btoa(JSON.stringify([]))}/${btoa("signup")}?verificationType=${btoa("SIGN_UP")}`
        //       // );
        //     },
        //     fail: (e) => showError(e)
        //   },
        // });
    };

    const setValue = (value, type) => {
        let temp = "";

        if (type === "first") temp = "firstField";
        else temp = "secondField";

        if (state[temp] && !isEmpty(value)) setState(s => ({...s, [temp]: isEmpty(value)}));
        else if (!state[temp] && isEmpty(value)) setState(s => ({...s, [temp]: isEmpty(value)}));
    }

    return (
        <>
            <Title medium lHeight="48" fs="32" className={"text-center mb-100"}>
                Registration
            </Title>
            <FormDemo
                formRequest={sendSmsCode}
            >
                <Field
                    type={"input"}
                    label={"Password"}
                    name={"password"}
                    property={{placeholder: "Enter password", type: "password"}}
                    params={{required: true}}
                    className={"input-container"}
                    onChange={(value) => setValue(value, "first")}
                />
                <Field
                    type={"input"}
                    label={"Confirm password"}
                    name={"prePassword"}
                    property={{placeholder: "Enter confirm password", type: "password"}}
                    params={{required: true}}
                    className={"input-container"}
                    onChange={(value) => setValue(value, "second")}
                />
                <Flex justify={"space-between"}>
                    <Button
                        onClick={() => history.push("/auth")}
                        center="1"
                        className="backButton"
                        lightButton
                    >
                        <Icon
                            icon="icon-left-arrow"
                            mainClassName="left-arrow"
                            className="dark"
                        />
                        Back
                    </Button>
                    <Button
                        disabled={(state.firstField || state.secondField)}
                        success="1"
                        center="1"
                        type={"submit"}
                        className="nextButton"
                    >
                        {loading ? <MiniLoader/> : "Next"}
                    </Button>
                </Flex>
            </FormDemo>
        </>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendSmsForSignUpRequest: ({attributes, formMethods, cb}) =>
            dispatch({
                type: Actions.SEND_SMS_FOR_SIGNUP.REQUEST,
                payload: {attributes, formMethods, cb},
            }),
        saveSignUpDataRequest: (data) =>
            dispatch({
                type: Actions.SAVE_SIGN_UP_PASSWORD.SUCCESS,
                payload: data,
            }),
        request: ({
                      attributes,
                      formMethods = {},
                      cb = {},
                      method = 'get',
                      url,
                  }) => {
            dispatch({
                type: ApiActions.REQUEST.REQUEST,
                payload: {
                    attributes,
                    cb,
                    url,
                    method,
                },
            });
        },
        checkAuth: (token = null) =>
            dispatch({
                type: Actions.CHECK_AUTH.REQUEST,
                payload: {token},
            }),
        saveToken: (token = null) =>
            dispatch({
                type: Actions.SAVE_TOKEN.SUCCESS,
                payload: { token },
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
