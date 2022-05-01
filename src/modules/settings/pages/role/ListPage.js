import React, {useEffect} from 'react';
import ListContainer from "../../containers/role/ListContainer";
import {useDispatch} from "react-redux";
import Actions from "../../actions";

const ListPage = ({location: {pathname}, ...rest}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: Actions.ADD_BREADCRUMB_ITEM.REQUEST, payload: {item: {name: 'Role list page', url: pathname}}});
    }, [])
    return (
      <ListContainer {...rest}/>
    );
};

export default ListPage;
