import React, { useState, useEffect, createRef } from "react";
import styled, { css } from "styled-components";
import { findIndex, get, isArray, isEqual, isNil } from "lodash";
import ReactTooltip from "react-tooltip";
import { Link, useHistory } from "react-router-dom";
import Icon from "../elements/icon";
import classNames from "classnames";
import { connect } from "react-redux";
import Actions from "../../modules/settings/actions";
import activeBg from "../../assets/images/union-bg.png";
import { getWordFromString, cropText } from "../../utils/index";
import TabContextMenu from "./contextMenu";
import Title from "../elements/title";


const StyledBreadcrumb = styled.div`
  display: flex;

  .breadcrumb {
    display: inline-flex;
    margin-bottom: 0;

    a {
      text-decoration: none;
    }

    &__item {
      list-style: none;
      display: flex;
      width: 235px;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      background-color: #EFF1F3;
      padding-left: 16px;
      padding-right: 28px;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;

      ::before {
        content: "";
        width: 1px;
        height: 16px;
        position: absolute;
        left: 0;
        background-color: #b1b5c3;
      }

      .a {
        color: #353945;
        text-decoration: none;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 14px;

        div {
          display: inline-block;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .xBtn {
        position: absolute;
        right: 18px;
      }

      &.active {
        border-radius: 20px 20px 0 0;
        background-image: url(${activeBg});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: left bottom;
        background-clip: border-box;
        padding-left: 12px;
        //padding-right: 20px;
        padding-right: 38px;

        ::before {
          display: none;
        }

        & + li::before {
          display: none;
        }

        .a {
          font-weight: 500;
        }
      }
    }

    .context_menu {
      :first-child {
        .breadcrumb__item {
          ::before {
            display: none;
          }
        }
      }
    }
  }

  .short-width {
    min-width: 50px !important;

    .a {
      margin-right: 15px;
    }
  }

  ${({ items }) => (items.length >= 7 && items.length <= 10) && css`
    .breadcrumb {
      &__item {
        width: 164px;

        &.active {
          padding-left: 10px;
          padding-right: 40px;
        }
      }
    }
  `}
  ${({ items }) => (items.length > 10) && css`
    .breadcrumb {
      &__item {
        padding-left: 5px;
        padding-right: 32px;
        width: 118px !important;

        .a {
          margin-right: 9px;
        }

        &.active {
          padding-left: 5px;
          //padding-right: 37px;
          padding-right: 28px;
        }
        .xBtn {
          right: 10px;
        }
      }
    }
  `} @keyframes leftAnim {
    0% {
      right: 0px;
      opacity: 0.8;
    }
    100% {
      right: 230px;
      opacity: 0;
    }
  }
`;


const Breadcrumb = ({
  items = [],
  active = null,
  removeBreadcrumbItem,
  ...rest
}) => {
  const [elRefs, setElRefs] = useState([]);
  const history = useHistory();

  const removeItem = (pathname) => {
    const index = findIndex(items, (item) =>
      isEqual(get(item, "url"), pathname)
    );
    if (index >= 0) {
      items = items.filter((item) => get(item, "url", "") !== pathname);
      removeBreadcrumbItem(items);
      if (pathname === active) history.push(get(items, `[${index - 1}].url`));
    } else if (pathname === active) removeAllTab();
  };

  const removeOtherTab = (pathname) => {
    const newTabs = items.filter(item => isEqual(get(item, "url"), pathname));
    removeBreadcrumbItem(newTabs);
    history.push(pathname);
  }

  const removeAllTab = (pathname) => {
    history.push("/default");
    removeBreadcrumbItem([]);
  }

  const removeLeftTab = (pathname, index) => {
    index = findIndex(items, (item) => isEqual(get(item, "url"), pathname));
    let newTabs = items.filter((i, ind) => (ind > (index - 1)));
    if (get(items[index], "url", "") !== active) {
      let res = newTabs.find(item => get(item, "url", "") === active);
      if (isNil(res)) history.push(get(newTabs, `[${0}].url`));
    }
    removeBreadcrumbItem(newTabs);
  }

  const removeRightTab = (pathname, index) => {
    index = findIndex(items, (item) => isEqual(get(item, "url"), pathname));
    let newTabs = items.filter((i, ind) => ind <= index);

    if (get(items[index], "url", "") !== active) {
      let res = newTabs.find(item => get(item, "url", "") === active);
      if (isNil(res)) history.push(get(newTabs, `[${0}].url`));
    }
    removeBreadcrumbItem(newTabs);
  }

  return (
    <StyledBreadcrumb {...rest} items={items}>
      <div className={"left_border"}></div>
      <ReactTooltip id="tabHover" />
      <ul className={"breadcrumb"}>
        {isArray(items) &&
          items &&
          items.map((item, index) => (
            <TabContextMenu
              key={get(item, "id", index + 1)}
              url={get(item, 'url')}
              {...{
                items,
                index,
                removeItem,
                removeOtherTab,
                removeAllTab,
                removeLeftTab,
                removeRightTab
              }}
            >
              <li
                // ref={elRefs[index]}
                className={classNames("breadcrumb__item", {
                  active: isEqual(get(item, "url"), active),
                }, { 'short-width': items.length >= 8 })}
                data-tip={get(item, "name")}
                data-place={"bottom"}
                data-effect={"solid"}
                data-for={"tabHover"}
              >
                <Title className="a" onClick={() => history.push(get(item, "url", "#"))}>
                  <div>
                    {isEqual(get(item, "url"), active) ? cropText(get(item, "name", "-")) : getWordFromString(get(item, "name", "-"), items.length)}
                  </div>
                </Title>
                <Icon
                  mainClassName={"xBtn"}
                  icon="icon-exit"
                  color="#323232"
                  onClick={(e) => removeItem(get(item, 'url'))}
                />
              </li>
            </TabContextMenu>
          ))}
      </ul>
    </StyledBreadcrumb>
  );
};
const mapStateToProps = (state) => {
  return {
    items: get(state, "settings.breadcrumbs", []),
    active: get(state, "settings.breadcrumb", null),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeBreadcrumbItem: (items) =>
      dispatch({
        type: Actions.REMOVE_BREADCRUMB_ITEM.REQUEST,
        payload: { items },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
