import React from 'react';
import { connect } from 'react-redux';

function HomeContainer() {
  return (
    <>

    </>
  );
}


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loginRequest: ({ attributes, formMethods, cb }) => {
    //   dispatch({
    //     type: Actions.LOGIN.REQUEST,
    //     payload: { attributes, formMethods, cb },
    //   });
    // },
    // saveSignInDataRequest: (data) =>
    //   dispatch({
    //     type: Actions.SAVE_SIGN_IN_PASSWORD.SUCCESS,
    //     payload: data,
    //   }),
    // checkAuth: (token = null) =>
    //   dispatch({
    //     type: Actions.CHECK_AUTH.REQUEST,
    //     payload: { token },
    //   }),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)