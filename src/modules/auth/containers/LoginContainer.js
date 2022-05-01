import React, {useState} from "react";
import {connect} from "react-redux";
import {Col, Row} from "react-grid-system";
import {Link, useHistory} from "react-router-dom";
import Button from "../../../components/elements/button";
import Title from "../../../components/elements/title";
import Flex from "../../../components/elements/flex";
import Icon from "../../../components/elements/icon";
import MiniLoader from "../../../components/loader/mini-loader";
import Actions from "../actions";
import FormDemo from "../../../containers/Form/form-demo";
import Field from "../../../containers/Form/field";
import Storage from "../../../services/local-storage";
import {showError} from "../../../utils";

const LoginContainer = ({
                            phone,
                            loginRequest,
                            saveSignInDataRequest,
                            checkAuth,
                            saveToken,
                            ...rest
                        }) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const login = ({data, setError}) => {
        const deviceKey = Storage.get('deviceKey');
        setLoading(true);
        loginRequest({
            attributes: {...data, phoneNumber: phone, deviceKey},
            formMethods: {setLoading, setError},
            cb: {
                success: ({ accessToken, ...other }) => {
                    setLoading(false);
                    console.log(accessToken)
                    if (accessToken) {
                        saveToken({ accessToken, ...other });
                        checkAuth(accessToken);
                        history.push(`/`);
                    }
                },
                fail: (e) => showError(e)
            },
        });
    };
    return (
        <>
            <Title medium lHeight="48" fs="32" className={"text-center mb-100"}>
                Welcome Back, Please <br/> log in to Get started
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
                        <Button center success="1" type={"submit"} className="nextButton">
                            {loading ? <MiniLoader/> : "Next"}
                        </Button>
                    </Flex>
                }
            >
                <Field
                    type={"input"}
                    label={"Password"}
                    name={"password"}
                    property={{placeholder: "**********", type: "password"}}
                    params={{required: true}}
                />
                <Row>
                    <Col xs={12}>
                        <Link to={`/auth/verification-methods/${btoa(phone)}/${btoa(JSON.stringify([]))}/${btoa("forgot")}`} className={"forgot-password"}>
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
        loginRequest: ({attributes, formMethods, cb}) => {
            dispatch({
                type: Actions.LOGIN.REQUEST,
                payload: {attributes, formMethods, cb},
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
                payload: {token},
            }),
        saveToken: (token) => dispatch({type: Actions.SAVE_TOKEN.SUCCESS, payload: {token}})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
