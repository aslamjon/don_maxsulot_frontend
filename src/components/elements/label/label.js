import React from 'react';
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #777E90;
  margin-bottom: 5px;
  padding-left: 5px;
  display: inline-block;
  text-transform: uppercase;
  margin-top: ${({mt}) => mt || 0}px;
  margin-bottom: ${({mb}) => mb || 0}px;
  margin-left: ${({ml}) => ml || 0}px;
  margin-right: ${({mr}) => mr || 0}px;
`;
const Label = ({...rest}) => {
    return (
        <StyledLabel {...rest} />
    );
};

export default Label;
