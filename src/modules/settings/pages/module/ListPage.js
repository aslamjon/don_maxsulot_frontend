import React, {useEffect} from 'react';
import ListContainer from "../../containers/module/ListContainer";
import {useDispatch} from "react-redux";
import Actions from "../../actions";
import styled from 'styled-components';
import {withTranslation} from "react-i18next";

const Style = styled.div`
    background-color: #F7F7FA;
    .modul-list-container-box {
        background-color: inherit;
        min-height: 91vh;
        .languages {
            &__item {
                margin-left: 28px;
            }
        }
        .col {
            &:nth-child(2) {
                .languages__item {
                    margin-left: 29px;
                }
            }
            &:nth-child(3) {
                .languages__item {
                    margin-left: 27px;
                }
            }
        }
    }
`;

const ListPage = ({t, location: {pathname}, ...rest}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: Actions.ADD_BREADCRUMB_ITEM.REQUEST,
            payload: {item: {name: t("settings_module_tab") ?? "settings_module_tab", url: pathname}}
        });
    }, [])
    return (
        <Style>
            <ListContainer {...rest} />
        </Style>
    );
};

export default withTranslation('pdp')(ListPage);
