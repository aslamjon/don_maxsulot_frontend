import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import Actions from "../../../settings/actions";
import styled from 'styled-components';
import ListContainer from "../../containers/language/ListContainer";

const PositionPageStyle = styled.div`
  .modal__body {
    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: #777E91;
      margin-bottom: 20px;
    }
    .form-label, .form-select-label {
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      text-transform: uppercase;
      color: #A7ADBF;
      margin-bottom: 6px;
    }
    .form-input-container, .Select__controller {
      height: 38px;
      background: #FAFAFB;
      border-radius: 6px;
      padding: 12px 10px;
      input {
        font-size: 14px;
      }
    }
  }
  .checkboxBtn, .cancelBtn, .addBtn {
    button {
      border-radius: 6px;
      font-style: normal;
      font-size: 12px;
      line-height: 18px;
    }
  }
    .checkbox-with-button {
      button{
        color: #353945;
        display: flex;
        align-items: center;
        font-size: 12px;
        .questionIcon {
          margin-left: 9px;
          height: 18px;
          width: 18px;
          .icon-question{
            height: 18px;
            width: 18px;
          }
        }
      }
    }
    .rc-checkbox {
      margin-right: 9px;
    }

  .cancelBtn {
    margin: 0 10px;
  }
  .addBtn {

  }
`;

const ListPage = ({location: {pathname},...rest}) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        if (pathname) {
            dispatch({
                type: Actions.ADD_BREADCRUMB_ITEM.REQUEST,
                payload: {item: {name: 'HR position  page', url: pathname}}
            });
        }
    },[])
    return (
        <PositionPageStyle>
            <ListContainer {...rest}/>
        </PositionPageStyle>
    );
};

export default withRouter(ListPage);
