import React from 'react';
import styled from "styled-components";
import {Row,Col} from "react-grid-system";
import Title from "../../../components/elements/title";

const Styled = styled.div`
  padding: 50px;
  box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
  border-radius: 10px;
  background: #F4F5F6;
  border: 1px solid #E6E8EC;
  .row{
    margin-bottom: 50px;
  }
  .nextBtn{
    margin-left: 10px;
  }
`;
const FormBox = ({children,title="NEW ROLE",...rest}) => {

    return (
        <Styled {...rest}>
            <Row className={'form-body-title row'}>
                <Col xs={12}>
                    <Title>{title}</Title>
                </Col>
            </Row>
            <Row className="form-box-body" justify={'center'}>
                <Col xs={6}>
                    {children}
                </Col>
            </Row>
        </Styled>
    );
};

export default FormBox;
