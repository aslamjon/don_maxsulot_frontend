import React from "react";
import styled from "styled-components";

const StyledListItem = styled.div`
  background: #f1f2f4;
  border-radius: 10px;
  padding: 25px 24px;
  cursor: pointer;
  margin-bottom: 10px;
  h2 {
    color: #353945;
    font-size: 20px;
    font-weight: 500;
  }
`;
const ListItem = ({ id, title, ...rest }) => {
  return (
    <StyledListItem {...rest}>
      <h2>{title}</h2>
    </StyledListItem>
  );
};

export default ListItem;
