import React from 'react';
import styled from "styled-components";
import SearchAndAdd from "../../../modules/hr/components/searchAndAdd";

const StyledComponentHead = styled.div`
`;

const ComponentHead = ({children,buttonText='Add',openModalOrLink = () => {},...rest}) => {
    return (
        <StyledComponentHead {...rest}>
            <SearchAndAdd buttonText={buttonText}  openModalOrLink={openModalOrLink}/>

            {children}
        </StyledComponentHead>
    );
};

export default ComponentHead;
