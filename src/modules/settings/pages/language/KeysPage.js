import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";
import Actions from "../../../settings/actions";
import styled from 'styled-components';
import KeysContainer from "../../containers/language/KeysContainer";

const PageStyle = styled.div`
`;

const ListPage = ({location: {pathname}, ...rest}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (pathname) {
            dispatch({
                type: Actions.ADD_BREADCRUMB_ITEM.REQUEST,
                payload: {item: {name: 'Language keys  page', url: pathname}}
            });
        }
    }, [])
    return (
        <PageStyle {...rest}>
            <KeysContainer {...rest}/>
        </PageStyle>
    );
};

export default withRouter(ListPage);
