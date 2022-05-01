import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { get, includes, keys, slice, sortBy } from "lodash";
import ApiActions from "../../../../services/api/actions";
import actions from "../../../../services/normalizer/actions";
import Normalizer from "../../../../services/normalizer";
import { connect } from "react-redux";
import Table from "./Table";
import { InitialLoader } from "../../../../components/loader";
import { showError } from "../../../../utils";

const Style = styled.div`
  position: relative;
`;
const GridTable = ({
  view = {},
  idList = [],
  getDataList,
  viewData,
  entities,
  viewId,
  url,
  storeName,
  entityName,
  scheme,
  updateItemRequest,
  viewSearchAndFilter,
  sortFromView,
  sorting,
  hideOrShowColumn,
  pinOrUnpinColumn,
  rowSize,
  redirectUrl,
  changeRequest,
  request,
  changeData,
  viewOneData,
  ...rest
}) => {
  const [startItemIndex, setStartItemIndex] = useState(0);
  const [lastItemIndex, setLastItemIndex] = useState(25);

  console.log("render table");

  useEffect(() => {
    if (lastItemIndex > startItemIndex) {
      loadData(startItemIndex, lastItemIndex);
    }
  }, [lastItemIndex]);

  viewData = Normalizer.Denormalize(viewData, { result: { data: [scheme] } }, entities);

  const loadNextPage = (startIndex, lastIndex) => {
    if (lastIndex + 1 >= lastItemIndex) {
      setStartItemIndex(lastItemIndex);
      setLastItemIndex(lastItemIndex + 15);
    }
  };

  const loadData = (startIndex, lastIndex) => {
    getDataList({
      id: viewId,
      params: slice(idList, startIndex, lastIndex),
      infinite: true,
    });
  };

  const hasInState = (data) => {
    return data.filter((item) => includes(keys(get(entities, `${entityName}`)), item));
  };

  const hasNotInState = (data) => {
    return data.filter((item) => !includes(keys(get(entities, `${entityName}`)), item));
  };

  const reorderingData = (data = [], ids = []) => {
    const last = data.length;

    return sortBy(data, function (item) {
      return ids.indexOf(get(item, "id")) !== -1 ? ids.indexOf(get(item, "id")) : last;
    });
  };

  if (!get(viewData, "isFetched", false)) {
    return <InitialLoader />;
  }

  const addCustomField = ({ data, setError }) => {
    // console.log(data, viewOneData);
    // let denormalizeData = Normalizer.Denormalize(viewOneData, {result: { data: [scheme] }}, entities);
    // console.log(denormalizeData)
    // changeData({ data, normalize_data: viewOneData, entities })

    request({
      attributes: data,
      formMethods: { setError },
      url: get(url, "addCustomField", "#"),
      cb: {
        success: (res) => {
          console.log(res);
        },
        fail: (e) => {
          showError(e);
        },
      },
    });
  };

  return (
    <Style {...rest}>
      <Table
        fields={get(view, "columns", [])}
        updateItemRequest={updateItemRequest}
        // data={reorderingData(get(viewData, 'result.data', []), idList)}
        data={get(viewData, "result.data", [])}
        columns={get(view, "columns", [])}
        permissions={get(view, "permissionsUser", {})}
        sortFromView={sortFromView}
        sorting={get(view, "sorting", [])}
        hideOrShowColumn={hideOrShowColumn}
        pinOrUnpinColumn={pinOrUnpinColumn}
        rowSize={get(view, "rowSize")}
        redirectUrl={redirectUrl}
        isNextPageLoading={get(viewData, "isFetched", false)}
        loadNextPage={loadNextPage}
        startItemIndex={startItemIndex}
        addCustomField={addCustomField}
      />
    </Style>
  );
};

const mapStateToProps = (state, props) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    viewData: get(state, `normalizer.data.${props.entityName}-view-data-list`, {}),
    viewOneData: get(state, `normalizer.data.${props.entityName}-view-one`, {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDataList: ({ id = null, params, infinite = false }) => {
      const storeName = `${ownProps.entityName}-view-data-list`;
      const entityName = ownProps.entityName;
      const scheme = { data: [ownProps.scheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `${get(ownProps, "url.data", "#")}/${id}`,
          method: "post",
          config: params,
          infinite,
          scheme,
          storeName,
          entityName,
        },
      });
    },

    addItemRequest: ({ attributes, formMethods, cb }) => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.entityName;
      const scheme = { data: ownProps.scheme };
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: get(ownProps, "url.add", "#"),
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },

    request: ({ attributes, formMethods, cb, url = "#", method = "post" }) => {
      dispatch({
        type: ApiActions.REQUEST.REQUEST,
        payload: {
          attributes,
          formMethods,
          method,
          cb,
          url,
        },
      });
    },

    updateItemRequest: ({
      id,
      viewId = get(ownProps, "viewId", ""),
      attributes,
      url = get(ownProps, "url.addOrEditCell", "#"),
      formMethods = {},
      cb = {},
      method = "patch",
      isChangeListState = true,
    }) => {
      const storeName = `${ownProps.entityName}-view-data-list`;
      const entityName = ownProps.entityName;
      const scheme = { data: ownProps.scheme };
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: `${url}${viewId ? `/${viewId}` : ""}${id ? `/${id}` : ""}`,
          method,
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
          isChangeListState,
        },
      });
    },

    changeRequest: ({ data }) => {
      const storeName = `${ownProps.entityName}-view-data-list`;
      const entityName = ownProps.entityName;
      dispatch({ type: ApiActions.CHANGE_DATA.SUCCESS, payload: { storeName, entityName, data } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(GridTable));
