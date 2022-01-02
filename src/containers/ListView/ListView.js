import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { InitialLoader } from "../../components/loader";
import Normalizer from "../../services/normalizer";
import ApiActions from "../../services/api/actions";

const ListView = ({
  ComponentHead,
  ComponentBody,
  callToRender,
  callToRenderTrigger,
  drawToRender,
  scheme,
  isFetched,
  meta,
  totalElements,
  totalPages,
  entities,
  ...rest
}) => {
  useEffect(() => {
    callToRender();
  }, []);

  let data = Normalizer.Denormalize(drawToRender, [scheme], entities);

  if (!isFetched) {
    return <InitialLoader />;
  }
  return (
    <>
      <ComponentHead />
      <ComponentBody data={data} />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    drawToRender: ownProps.schemeStructure
      ? get(state, `normalizer.data.${ownProps.storeName}.result`, [])
      : get(state, `normalizer.data.${ownProps.storeName}.result.data`, []),
    isFetched: get(
      state,
      `normalizer.data.${ownProps.storeName}.isFetched`,
      false
    ),
    meta: get(
      state,
      `normalizer.data.${ownProps.storeName}.result.pageable`,
      {}
    ),
    totalElements: get(
      state,
      `normalizer.data.${ownProps.storeName}.result.totalElements`,
      0
    ),
    totalPages: get(
      state,
      `normalizer.data.${ownProps.storeName}.result.totalPages`,
      0
    ),
    entities: get(state, "normalizer.entities", []),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    callToRender: (params) => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.storeName;
      const scheme = ownProps.schemeStructure
        ? [ownProps.scheme]
        : { data: [ownProps.scheme] };
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: ownProps.url,
          baseUrl: ownProps.baseUrl,
          config: {
            params,
            ...ownProps.params,
          },
          scheme,
          storeName,
          entityName,
        },
      });
    },
    callToRenderTrigger: () => {
      const storeName = ownProps.storeName;
      const entityName = ownProps.entityName;
      dispatch({
        type: ApiActions.GET_ALL.TRIGGER,
        payload: {
          storeName,
          entityName,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
