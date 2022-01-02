import React from 'react';
import styled from "styled-components";
import {Container} from 'react-grid-system';
import Header from "../header";

const StyledContent = styled.div`
  min-height: 100vh;
  background-color: #fff;
  width: 100%;
  .body{
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;
const Content = ({children, ...rest}) => {
    return (
        <StyledContent {...rest}>
            <Header/>
            <div className="body">
                <Container fluid>{children} </Container>
            </div>
        </StyledContent>
    );
};

export default Content;
