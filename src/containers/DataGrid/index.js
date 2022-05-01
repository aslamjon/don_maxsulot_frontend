import React, { memo, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { find, get, head, isEmpty, isEqual, isNil, uniqBy } from "lodash";
import { withRouter } from "react-router-dom";
import ViewTypeScheme from "../../schema/ViewTypeScheme";
import ViewOneScheme from "../../schema/ViewOneScheme";
import ApiActions from "../../services/api/actions";
import { withTranslation } from "react-i18next";
import Normalizer from "../../services/normalizer";
import GridHeader from "./components/GridHeader";
import { changeUrlWithoutRefresh } from "../../utils";
import GridBody from "./components/GridBody";
import { InitialLoader } from "../../components/loader";

const Container = ({
  t,
  history,
  match: {
    params: { id },
  },
  getViewTypesList,
  entities,
  viewTypesList,
  getViewOne,
  view,
  scheme,
  entityName,
  url,
  updateViewRequest,
  addViewRequest,
  redirectUrl,
  BoardItemComponent,
  itemAddModal,
  deleteViewRequest,
  duplicateViewRequest,
  customLeftElement,
  customRightElement,
  ...rest
}) => {
  const [viewState, setViewState] = useState({});
  const [loadView, setLoadView] = useState(true);

  useEffect(() => {
    if (!isEmpty(get(url, "viewList", "")) && isEmpty(viewTypesList)) {
      getViewTypesList();
    }
  }, []);

  viewTypesList = Normalizer.Denormalize(
    viewTypesList,
    { result: { data: { viewTypes: [ViewTypeScheme] } } },
    entities
  );

  useEffect(() => {
    if (get(viewTypesList, "isFetched")) {
      if (!isEmpty(get(url, "viewList", ""))) {
        const viewId = !isNil(id)
          ? id
          : get(head(get(viewTypesList, `result.data.viewTypes`, [])), "defaultView.id", null);
        getViewOne(viewId);
      }
    }
    if (isEmpty(get(url, "viewList", ""))) {
      getViewOne(null);
    }
  }, [id, get(viewTypesList, "isFetched")]);

  useEffect(() => {
    view = Normalizer.Denormalize(view, { result: { data: ViewOneScheme } }, entities);
    if (!isEmpty(get(view, "result.data"))) {
      setViewState(get(view, "result.data", {}));
    }
  }, [view]);

  view = Normalizer.Denormalize(view, { result: { data: ViewOneScheme } }, entities);

  if (!id && get(head(get(viewTypesList, `result.data.viewTypes`, [])), "defaultView.id", "")) {
    changeUrlWithoutRefresh(
      `${
        redirectUrl.view +
        get(head(get(viewTypesList, `result.data.viewTypes`, [])), "defaultView.id", "")
      }`
    );
  }

  const canUpdateView = (result = {}) => {
    return (
      !isEmpty(result) &&
      get(result, "autoSave", false) &&
      get(result, "permissionsUser.canUpdateView", false)
    );
  };

  const searchView = useCallback(
    (search, columns) => {
      const result = {
        ...get(view, "result.data", {}),
        viewFilter: {
          ...get(view, "result.data.viewFilter", {}),
          search,
          searchingColumns: columns,
        },
      };

      setViewState(result);

      if (canUpdateView(result)) {
        updateViewRequest({ attributes: result });
      }
    },
    [view]
  );

  const sortFromView = useCallback(
    (column, isAdd = null) => {
      console.log(column, isAdd);
      if (isAdd) {
        let hasColumn = find(get(viewState, "sorting"), (item) =>
          isEqual(get(item, "field"), get(column, "field"))
        );
        hasColumn = hasColumn
          ? {
              ...column,
              direction: isEqual(get(column, "direction"), 1) ? -1 : 1,
            }
          : column;

        const columns = [...get(viewState, "sorting", [])].sort(
          (a, b) => a.orderIndex - b.orderIndex
        );
        const idxColumn = columns.findIndex((item) => item.field == column.field);

        if (idxColumn > -1) columns.splice(idxColumn, 1, hasColumn);

        const result = {
          ...get(view, "result.data", {}),
          sorting:
            idxColumn > -1 ? columns : uniqBy([...get(viewState, "sorting"), hasColumn], "field"),
        };

        setViewState(result);

        if (canUpdateView(result)) {
          updateViewRequest({ attributes: result });
        }
      } else if (!isNil(isAdd)) {
        const result = {
          ...get(view, "result.data", {}),
          sorting: get(viewState, "sorting").filter(
            (item) => !isEqual(get(item, "field"), get(column, "field"))
          ),
        };

        setViewState(result);

        if (canUpdateView(result)) {
          updateViewRequest({ attributes: result });
        }
      }
    },
    [viewState]
  );

  const filterView = useCallback(
    (filterFields, filterOperator) => {
      const result = {
        ...get(view, "result.data", {}),
        viewFilter: { ...get(view, "result.data.viewFilter", {}), filterFields, filterOperator },
      };

      setViewState(result);

      if (canUpdateView(result)) {
        // updateViewRequest({attributes: result});
      }
    },
    [view]
  );

  const hideOrShowColumn = useCallback(
    (column, show) => {
      let result = {
        ...viewState,
        columns: get(viewState, "columns", []).map((col) => {
          if (!isNil(column))
            return isEqual(get(col, "id"), column)
              ? {
                  ...col,
                  hidden: !show,
                }
              : col;
          else
            return !isEqual(get(col, "root"), true)
              ? {
                  ...col,
                  hidden: !show,
                }
              : { ...col, hidden: false };
        }),
      };

      if (!isEmpty(result)) {
        setLoadView(false);
        setViewState(result);
        if (canUpdateView(result)) {
          updateViewRequest({ attributes: result });
        }
      }
    },
    [viewState, loadView]
  );

  const pinOrUnpinColumn = useCallback(
    (column, pin) => {
      let result = viewState;
      if (pin && !isNil(column)) {
        result = {
          ...result,
          columns: get(result, "columns", []).map((col) =>
            isEqual(get(col, "id"), column)
              ? {
                  ...col,
                  pinned: true,
                }
              : col
          ),
        };
      }
      if (!pin && !isNil(column)) {
        result = {
          ...result,
          columns: get(result, "columns").map((col) =>
            isEqual(get(col, "id"), column)
              ? {
                  ...col,
                  pinned: false,
                }
              : col
          ),
        };
      }
      if (!isEmpty(result)) {
        setLoadView(false);
        setViewState(result);
      }
      if (canUpdateView(result)) {
        updateViewRequest({ attributes: result });
      }
    },
    [viewState, loadView]
  );

  const resizeColumn = useCallback((column, width) => {}, [view]);

  const reOrderColumn = useCallback(() => {}, [view]);

  const changeRowSize = useCallback(
    (rowSize) => {
      const result = {
        ...viewState,
        rowSize,
      };
      setLoadView(false);
      setViewState(result);
      if (canUpdateView(result)) {
        updateViewRequest({ attributes: result });
      }
    },
    [viewState, loadView]
  );

  // if (
  //   !isEmpty(get(url, "viewList", "") && !get(viewTypesList, "isFetched", false)) ||
  //   !get(view, "isFetched", false)
  // ) {
  //   return <InitialLoader />;
  // }

  const type = get(viewState, "type", "TABLE");

  return (
    <>
      <GridHeader
        // viewTypesList={viewTypesList}
        view={viewState}
        searchFromView={searchView}
        // hideOrShowColumn={hideOrShowColumn}
        // changeRowSize={changeRowSize}
        // addViewRequest={addViewRequest}
        // filterView={filterView}
        filter={get(viewState, "result.data.viewFilter", {})}
        // history={history}
        // redirectUrl={redirectUrl}
        // type={type}
        // itemAddModal={itemAddModal}
        // deleteViewRequest={deleteViewRequest}
        // duplicateViewRequest={duplicateViewRequest}
        {...{
          duplicateViewRequest,
          deleteViewRequest,
          itemAddModal,
          type,
          redirectUrl,
          history,
          filterView,
          addViewRequest,
          changeRowSize,
          hideOrShowColumn,
          viewTypesList,
          customLeftElement,
          customRightElement,
        }}
      />
      <GridBody
        type={type}
        view={viewState}
        loadView={loadView}
        entityName={entityName}
        scheme={scheme}
        sortFromView={sortFromView}
        hideOrShowColumn={hideOrShowColumn}
        pinOrUnpinColumn={pinOrUnpinColumn}
        redirectUrl={redirectUrl}
        BoardItemComponent={BoardItemComponent}
        url={{
          ids: get(url, "ids", "#"),
          data: get(url, "data", "#"),
          addOrEditCell: get(url, "addOrEditCell", "#"),
          addCustomField: get(url, "addCustomField", "#"),
          editCustomField: get(url, "editCustomField", "#"),
        }}
        viewId={
          id ?? get(head(get(viewTypesList, `result.data.viewTypes`, [])), "defaultView.id", null)
        }
      />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    viewTypesList: get(state, `normalizer.data.${ownProps.entityName}-view-types-list`, {}),
    view: get(state, `normalizer.data.${ownProps.entityName}-view-one`, {}),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getViewTypesList: () => {
      const storeName = `${ownProps.entityName}-view-types-list`;
      const entityName = `${ownProps.entityName}-view-type`;
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `${get(ownProps, "url.viewList", "#")}`,
          config: {
            params: {},
          },
          scheme: { data: { viewTypes: [ViewTypeScheme] } },
          storeName: storeName,
          entityName: entityName,
        },
      });
    },
    getViewOne: (id) => {
      const storeName = `${ownProps.entityName}-view-one`;
      const entityName = `${ownProps.entityName}-view-type-one`;
      const scheme = { data: ViewOneScheme };
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `${get(ownProps, "url.viewOne", "#")}/${id}`,
          scheme,
          storeName,
          entityName,
        },
      });
    },
    addViewRequest: ({ attributes, formMethods, cb }) => {
      const storeName = "view-types-list";
      const entityName = "view-type";
      // const storeName = `${ownProps.entityName}-view-types-list`;
      // const entityName = `${ownProps.entityName}-view-type`;
      const scheme = { data: ViewTypeScheme };
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes,
          formMethods,
          cb,
          url: get(ownProps, "url.viewAdd", "#"),
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
          isChangeListState: false,
        },
      });
    },

    deleteViewRequest: ({ id, formMethods, cb }) => {
      const storeName = "view-types-list";
      const entityName = "view-type";
      // const storeName = `${ownProps.entityName}-view-types-list`;
      // const entityName = `${ownProps.entityName}-view-type`;
      const scheme = { data: ViewTypeScheme };
      dispatch({
        type: ApiActions.OPERATION_DELETE.REQUEST,
        payload: {
          id,
          formMethods,
          cb,
          url: `${get(ownProps, `url.viewDelete`, "#")}/${id}`,
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },

    updateViewRequest: ({ attributes, formMethods = {}, cb = {} }) => {
      const storeName = "view-types-list";
      const entityName = "view-type";
      // const storeName = `${ownProps.entityName}-view-types-list`;
      // const entityName = `${ownProps.entityName}-view-type`;
      const scheme = { data: ViewTypeScheme };
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          attributes,
          formMethods,
          url: `${get(ownProps, "url.viewUpdate", "#")}`,
          config: {
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
          isChangeListState: false,
        },
      });
    },

    duplicateViewRequest: (id) => {
      const storeName = "duplicate-view";
      const entityName = "view-type";
      // const storeName = `${ownProps.entityName}-duplicate-view`;
      // const entityName = `${ownProps.entityName}-view-type`;
      const scheme = { data: ViewTypeScheme };
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `${get(ownProps, "url.viewDuplicate", "#")}/${id}`,
          scheme,
          storeName,
          entityName,
        },
      });
    },
  };
};

export default withTranslation("pdp")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(memo(Container)))
);
