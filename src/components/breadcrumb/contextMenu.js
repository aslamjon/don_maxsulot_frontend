import React from 'react';
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { findIndex, get, isEqual } from "lodash";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const TabContextmenuStyle = styled.div`
  .react-contextmenu {
    min-width: 320px;
    background: #FCFCFD;
    border: 1px solid #E6E8EC;
    box-shadow: 0px 24px 24px -20px rgba(15, 15, 15, 0.15);
    border-radius: 4px;
    padding: 9px 6px;
    z-index: 99999;

    &-item {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #353945;
      padding: 5px 8px;
      transition: 0.5s ease;
      border-radius: 2px;
      cursor: pointer;

      &:hover {
        background: #F4F5F6;
      }
    }
  }
`;


const TabContextMenu = ({
    children, items = [],
    removeItem = () => { },
    removeOtherTab = () => "",
    url = "",
    removeAllTab = () => "",
    removeLeftTab = () => "",
    removeRightTab = () => "",
    index,
}) => {

    function handleClick(e, data) {
        if (get(data, "type", '') === 'close') removeItem(url);
        else if (get(data, "type", '') === 'close other') removeOtherTab(url);
        else if (get(data, "type", '') === 'close all') removeAllTab();
        else if (get(data, "type", '') === 'close left') removeLeftTab(url);
        else if (get(data, "type", '') === 'close right') removeRightTab(url);
    }

    return (
        <TabContextmenuStyle className='context_menu'>
            <ContextMenuTrigger id={`id${index}`}>
                {children}
            </ContextMenuTrigger>
            <ContextMenu id={`id${index}`}>
                <MenuItem data={{ type: 'close' }} onClick={handleClick}>
                    Close
                </MenuItem>
                <MenuItem data={{ type: 'close other' }} onClick={handleClick}>
                    Close Other Tabs
                </MenuItem>
                <MenuItem data={{ type: 'close all' }} onClick={handleClick}>
                    Close All Tabs
                </MenuItem>
                <MenuItem data={{ type: 'close left' }} onClick={handleClick}>
                    Close Tabs to the Left
                </MenuItem>
                <MenuItem data={{ type: 'close right' }} onClick={handleClick}>
                    Close Tabs to the Right
                </MenuItem>
            </ContextMenu>
        </TabContextmenuStyle>
    );
};

export default TabContextMenu;