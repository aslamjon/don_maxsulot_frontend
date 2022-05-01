import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { get, isEmpty, toLower } from "lodash";
import ApiActions from "../../../services/api/actions";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Table from "./table";
import { InitialLoader } from "../../../components/loader";
import Board from "./board/Board";
import List from "./list/List";

const Style = styled.div``;
const GridBody = ({
  t,
  type = "TABLE",
  view = {},
  getIdList,
  idList,
  url,
  viewId,
  entityName,
  scheme,
  loadView,
  hideOrShowColumn = () => {},
  pinOrUnpinColumn = () => {},
  BoardItemComponent,
  redirectUrl,
  sortFromView,
  ...rest
}) => {
  useEffect(() => {
    if (loadView) {
      if (!isEmpty(view)) {
        getIdList({ config: view });
      }
    }
  }, [view, loadView]);

  if (!get(idList, "isFetched", false)) {
    console.log(idList);
    return "";
    return <InitialLoader />;
  }

  return (
    <Style {...rest}>
      {((type) => {
        switch (type) {
          case "TABLE":
            return (
              <Table
                view={view}
                viewId={viewId}
                idList={get(idList, "result.data.genericResult", [])}
                url={url}
                entityName={entityName}
                scheme={scheme}
                hideOrShowColumn={hideOrShowColumn}
                pinOrUnpinColumn={pinOrUnpinColumn}
                redirectUrl={redirectUrl}
                sortFromView={sortFromView}
              />
            );
          case "BOARD":
            return (
              <Board
                view={view}
                viewId={viewId}
                idList={get(idList, "result.data.genericResult", [])}
                url={url}
                entityName={entityName}
                scheme={scheme}
                BoardItemComponent={BoardItemComponent}
              />
            );
          case "LIST":
            return (
              <List
                view={view}
                viewId={viewId}
                idList={get(idList, "result.data.genericResult", [])}
                url={url}
                entityName={entityName}
                scheme={scheme}
              />
            );
          default:
            return (
              <Table
                view={view}
                viewId={viewId}
                idList={get(idList, "result.data.genericResult", [])}
                url={url}
                entityName={entityName}
                scheme={scheme}
              />
            );
        }
      })(type)}
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    idList: get(state, `api.${toLower(props.type)}-data-id-list.data`, {}),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getIdList: ({ config }) => {
      dispatch({
        type: ApiActions.GET_DATA.REQUEST,
        payload: {
          url: get(props, "url.ids", "#"),
          config,
          storeName: `${toLower(props.type)}-data-id-list`,
        },
      });
    },
  };
};

export default withTranslation("pdp")(connect(mapStateToProps, mapDispatchToProps)(memo(GridBody)));
