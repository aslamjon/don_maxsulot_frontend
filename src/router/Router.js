import React from 'react';
import { BrowserRouter as WebRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from './history';
import LayoutManager from "../layouts/LayoutManager";
import AuthLoader from "../services/auth/AuthLoader";
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import HasAccess from "../services/auth/HasAccess";
import NotFoundPage from "../modules/auth/pages/NotFoundPage";
import LoginPage from "../modules/auth/pages/LoginPage";
import LoginOrSignUpPage from "../modules/auth/pages/LoginOrSignUpPage";
import VerificationPage from "../modules/auth/pages/VerificationPage";
import SignUpPage from "../modules/auth/pages/SignUpPage";
import ModuleListPage from "../modules/settings/pages/module/ListPage";


const Router = ({ setBreadcrumbItemRequest, ...rest }) => {
    return (
        <WebRouter history={history}>
            <AuthLoader>
                <LayoutManager>
                    <IsAuth>
                        <HasAccess>
                            {({ userCan, modules, departments, pages, permissions }) => (
                                <Switch>
                                    <Route path={'/'} exact render={(props) => <ModuleListPage {...props} />} />

                                    <Route path={'/404'} exact component={NotFoundPage} />
                                    <Redirect to={'/404'} />
                                </Switch>
                            )
                            }
                        </HasAccess>
                    </IsAuth>
                    <IsGuest>
                        <Switch>
                            <Route path={'/auth'} exact component={LoginOrSignUpPage} />
                            <Route path={'/auth/sign-up/:phone'} exact component={SignUpPage} />
                            <Route path={'/auth/verification/:phone/:smsCodeId'} exact component={VerificationPage} />
                            <Route path={'/auth/login/:phone'} exact component={LoginPage} />
                            <Redirect to={'/auth'} />
                        </Switch>
                    </IsGuest>
                </LayoutManager>
            </AuthLoader>
        </WebRouter>
    );
};

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Router);
