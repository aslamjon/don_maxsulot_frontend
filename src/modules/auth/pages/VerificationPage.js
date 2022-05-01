import React from 'react';
import {useParams} from "react-router-dom";
import VerificationContainer from "../containers/VerificationContainer";
import styled from 'styled-components';

const VerificationPageStyled = styled.div`
    .messageAboutSending {
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 40px;
    }
  h2{
    font-size: 32px;
    font-weight: 500;
    line-height: 48px;
    margin-bottom: 80px;
  }
    .checkbox {
        margin: 30px 0; 
        label {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: #353945;
            .rc-checkbox {
                margin-right: 15px;
                .rc-checkbox-inner {
                    border: 2px solid #777E91;
                    &:hover {
                        border: 2px solid #777E91;
                    }
                }
                &:hover {
                    .rc-checkbox-inner {
                        border: 2px solid #777E91;
                    }
                }
                &.rc-checkbox-checked {
                    .rc-checkbox-inner {
                        border: none;
                    }
                }
            }
        }
    }
    .verification-input {
        input {
            background: #FCFCFD;
        }
    }
`;

const VerificationPage = ({...rest}) => {
    const {phone,smsCodeId} = useParams();
    return (
        <VerificationPageStyled>
            <VerificationContainer phone={atob(phone)} smsCodeId={smsCodeId} {...rest}/>
        </VerificationPageStyled>
    );
};

export default VerificationPage;
