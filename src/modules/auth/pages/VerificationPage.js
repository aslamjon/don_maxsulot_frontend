import React from 'react';
import {useParams} from "react-router-dom";
import VerificationContainer from "../containers/VerificationContainer";
import styled from 'styled-components';

const VerificationPageStyled = styled.div`
    .messageAboutSending {
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 10%;
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
