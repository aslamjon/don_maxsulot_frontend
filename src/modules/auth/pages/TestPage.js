import React, { memo } from 'react';
import styled from 'styled-components';

const StyledTestPage = styled.div`
padding: 30px 38px;
`;

const TestPage = () => {
  return (
    <StyledTestPage>

    </StyledTestPage>
  )
}

export default memo(TestPage);