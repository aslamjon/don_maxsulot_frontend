import React, { lazy, Suspense } from "react";
import { BrowserRouter as WebRouter, Redirect, Route, Switch } from "react-router-dom";
import history from "./history";
import LayoutManager from "../layouts/LayoutManager";
import AuthLoader from "../services/auth/AuthLoader";
import IsAuth from "../services/auth/IsAuth";
import HasAccess from "../services/auth/HasAccess";
import { InitialLoader } from "../components/loader";
import IsGuest from "../services/auth/IsGuest";

// AUTH MODULES
const Components = lazy(() => import("../modules/auth/pages/Components"));
const SignUpPage = lazy(() => import("../modules/auth/pages/SignUpPage"));
const VerificationPage = lazy(() => import("../modules/auth/pages/VerificationPage"));
const VerificationMethodsPage = lazy(() => import("../modules/auth/pages/VerificationMethodsPage"));
const LoginOrSignUpPage = lazy(() => import("../modules/auth/pages/LoginOrSignUpPage"));
const SecretQuestionPage = lazy(() => import("../modules/auth/pages/SecretQuestionPage"));
const ForgotPhoneNumberPage = lazy(() => import("../modules/auth/pages/ForgotPhoneNumberPage"));
const TestPage = lazy(() => import("../modules/auth/pages/TestPage"));
const LoginPage = lazy(() => import("../modules/auth/pages/LoginPage"));
const NotFoundPage = lazy(() => import("../modules/auth/pages/NotFoundPage"));
const DefaultPage = lazy(() => import("../modules/auth/pages/DefaultPage"));


const Router = () => {
  return (
    <WebRouter history={history}>
      <AuthLoader>
        <LayoutManager>
          <Suspense fallback={<InitialLoader />}>
            <IsAuth>
              <HasAccess>
                {({ userCan, modules, departments, pages, permissions }) => (
                  <Switch>
                    <Route path={["/", "/components"]} exact component={Components} />


                    <Route path={"/default"} exact render={(props) => <DefaultPage {...props} />} />

                    <Route path={"/test"} exact component={TestPage} />

                    <Route path={"/404"} exact component={NotFoundPage} />

                    <Redirect to={"/404"} />
                  </Switch>
                )}
              </HasAccess>
            </IsAuth>
            <IsGuest>
              <Switch>
                <Route path={"/auth"} exact component={LoginOrSignUpPage} />

                <Route path={"/auth/sign-up/:phone"} exact component={SignUpPage} />

                <Route
                  path={"/auth/verification/:phone/:smsCodeId/:message/:options/:type"}
                  exact
                  component={VerificationPage}
                />

                <Route path={"/auth/secret-question/:phone/:options/:question/:page/:type"} exact component={SecretQuestionPage} />

                <Route path={["/auth/forgot-phone-number","/auth/forgot-phone-number/:email"]} exact component={ForgotPhoneNumberPage} />

                <Route
                  path={"/auth/verification-methods/:phone/:options/:type"}
                  exact
                  component={VerificationMethodsPage}
                />

                <Route path={"/auth/login/:phone"} exact component={LoginPage} />

                <Route path={"/test"} exact component={TestPage} />

                <Route path={"/components"} exact component={Components} />

                <Redirect to={"/auth"} />
              </Switch>
            </IsGuest>
          </Suspense>
        </LayoutManager>
      </AuthLoader>
    </WebRouter>
  );
};

export default Router;
