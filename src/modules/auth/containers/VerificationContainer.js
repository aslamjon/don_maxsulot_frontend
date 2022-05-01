import React, {memo, useCallback, useMemo, useState} from "react";
import {connect} from "react-redux";
import {get, isEmpty, isEqual} from "lodash";
import Title from "../../../components/elements/title";
import {useHistory, useLocation} from "react-router-dom";
import Button from "../../../components/elements/button";
import MiniLoader from "../../../components/loader/mini-loader";
import Actions from "../actions";
import Flex from "../../../components/elements/flex";
import Text from "../../../components/elements/text";
// import CountdownTimer from "../../../components/countdown-timer";
import Icon from "../../../components/elements/icon";
import {getQueryParams} from "../../../utils";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import Storage from "../../../services/local-storage";
import {withTranslation} from "react-i18next";


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
                                   match,
                                   t,
                                   ...rest
                               }) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {search} = useLocation();
    const verificationType = getQueryParams(search, "verificationType");

    if (get(match, "url", "") !== window.location.pathname) history.push(get(match, "url", ""));

    const request = ({data, setError}) => {
        if (isEqual(verificationType, "SIGN_UP")) {
            signUpRequest({
                attributes: {...data, ...sign_up_data, phoneNumber: phone, smsCodeId},
                formMethods: {setLoading, setError},
                cb: {
                    success: ({accessToken, deviceKey}) => {
                        Storage.set('deviceKey', deviceKey);
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
                formMethods: {setLoading, setError},
                cb: {
                    success: ({accessToken, deviceKey}) => {
                        Storage.set('deviceKey', deviceKey);
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
                attributes: {...sign_up_data, phoneNumber: phone},
                formMethods: {setLoading},
                cb: {
                    success: ({phoneNumber, smsCodeId}) => {
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
                attributes: {password: sign_in_data, phoneNumber: phone},
                formMethods: {setLoading},
                cb: {
                    success: ({
                                  hasToken,
                                  phoneNumber,
                                  smsCode: {smsCodeId},
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

    let options = useMemo(() => JSON.parse(atob(get(match, "params.options", {}))), [match]);

    let type = atob(get(match, "params.type", {}));

    const goToBack = useCallback(() => {
        if (isEmpty(options)) history.push(`/auth/login/${get(match, "params.phone", "")}`);
        else history.push(`/auth/verification-methods/${get(match, "params.phone", "")}/${btoa(JSON.stringify(options))}/${get(match, "params.type", {})}`);
    }, [match]);

    return (
        <>
            <Title lg className={"text-center mb-100"}>
                {type === "forgot" ? (t("reset_password") ?? "Reset password") : (t("verification") ?? "Verification")}
            </Title>
            <Text className="messageAboutSending">
                <span>{t("we_have_to_sent_the_code_verification_to") ?? "We have to sent the code verification to"}</span>
                <span>{atob(get(match, "params.message", ""))}</span>
                {(get(match, "params.smsCodeId", {}) === "undefined")
                    ? <span> {t("if_you_did_not_receive_anything,_check_the_spam_folder_or_resend_it.") ?? "If you did not receive anything, check the spam folder or resend it."}</span>
                    : <span> {t("verification_code_sent_to_phone_number") ?? "Verification code sent to phone number"} </span>}
            </Text>
            {/*<CountdownTimer resend={resendSmsCode}/>*/}
            <FormDemo formRequest={request} footer={<Flex justify={"space-between"}>
                <Button
                    center="1"
                    onClick={goToBack}
                    center
                    className="backButton"
                    lightSmBorder
                    lightButton
                >
                    <Icon
                        icon="icon-left-arrow"
                        mainClassName="left-in-button"
                        className="dark"
                    />
                    {t("back") ?? "Back"}
                </Button>
                <Button
                    center
                    // disabled={!isEmpty(errors)}
                    success="1"
                    type={"submit"}
                    lightSmBorder
                    className="nextButton"
                >
                    {loading ? <MiniLoader/> : t("next") ?? "Next"}{" "}
                </Button>
            </Flex>}>
                <Field className="verification2" type={'verification'} params={{required: true}} name={"smsCode"}/>
                <Field className="checkbox" type={'checkbox'} name={"reliableDevice"} label={"Reliable device"}/>
            </FormDemo>
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
        signUpRequest: ({attributes, formMethods, cb}) =>
            dispatch({
                type: Actions.SIGN_UP.REQUEST,
                payload: {attributes, formMethods, cb},
            }),
        signInWithPhoneNumber: ({attributes, formMethods, cb}) =>
            dispatch({
                type: Actions.SEND_SMS_FOR_LOGIN_OR_FORGOT_PASSWORD.REQUEST,
                payload: {attributes, formMethods, cb},
            }),
        sendSmsForSignUpRequest: ({attributes, formMethods, cb}) =>
            dispatch({
                type: Actions.SEND_SMS_FOR_SIGNUP.REQUEST,
                payload: {attributes, formMethods, cb},
            }),
        sendSmsForLoginRequest: ({attributes, formMethods, cb}) => {
            dispatch({
                type: Actions.LOGIN.REQUEST,
                payload: {attributes, formMethods, cb},
            });
        },

        checkAuth: (token = null) =>
            dispatch({
                type: Actions.CHECK_AUTH.REQUEST,
                payload: {token},
            }),
    };
};
export default withTranslation('pdp')(connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(VerificationContainer)));
