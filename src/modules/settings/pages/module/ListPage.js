import React from 'react';
import ListContainer from "../../containers/module/ListContainer";

const ListPage = ({...rest}) => {
    return (
        <>
            <ListContainer {...rest} />
        </>
    );
};

export default ListPage;
