import React from 'react';
import styled, {css} from "styled-components";
import {Container} from "react-grid-system";

const Styled = styled.div`
  background-color: #fff;
  padding: 30px 20px;
  ${({gray}) => gray && css`
    background-color: #F7F7FA;
  `}
  ${({sm}) => sm && css`
    padding: 10px 20px;
  `}
`;
const Box = ({children, ...rest}) => {
    return (
        <Styled {...rest}>
            <Container fluid>{children}</Container>
        </Styled>
    );
};

export default Box;
