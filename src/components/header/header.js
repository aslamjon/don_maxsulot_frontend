import React from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {get} from "lodash";
import Breadcrumb from "../breadcrumb";
import Account from "../elements/account";
import Actions from "../../modules/settings/actions";

const StyledHeader = styled.header`
  background-color: #F7F7FA;
  padding-top: 37px;
  padding-bottom: 0px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  .btn {
    margin-bottom: 8px;
  }
`;
const Header = ({user,changeModeRequest,mode, ...rest}) => {
    return (
        <StyledHeader {...rest}>
            <Breadcrumb/>
            <Account user={user} changeModeRequest={changeModeRequest} mode={mode}/>
        </StyledHeader>
    );
};

const mapStateToProps = (state) => {
    return {
        mode:get(state,'settings.mode','light')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeModeRequest: (mode) => dispatch({type: Actions.SET_MODE.REQUEST, payload: {mode}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));
