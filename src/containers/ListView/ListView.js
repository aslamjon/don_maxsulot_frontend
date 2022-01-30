import React, {useEffect} from "react";
import {connect} from "react-redux";
import {get, orderBy} from "lodash";
import {InitialLoader} from "../../components/loader";
import Normalizer from "../../services/normalizer";
import ApiActions from "../../services/api/actions";
import {toast} from "react-toastify";

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
                      addItemRequest,
                      addTitle = 'ADD',
                      ...rest
                  }) => {

    useEffect(() => {
        callToRender();
    }, []);

    let data = orderBy(Normalizer.Denormalize(drawToRender, {data:{content:[scheme]}}, entities), ['orderIndex'], ['asc']);

    const changeListOrder = ({data, request}) => {
        request({
            attributes: {...data}, formMethods: {}, cb: {
                success: ({message = 'SUCCESS'}) => {
                    toast.success(message);
                },
            }
        });
    }

    if (!isFetched) {
        return <InitialLoader/>
    }

    const add = ({data, setError, closeModal}) => {
        addItemRequest({
            attributes: data, formMethods: {setError}, cb: {
                success: ({message = 'SUCCESS'}) => {
                    toast.success(message);
                    closeModal()
                },
                fail: () => {

                }
            }
        })
        console.log('data', data)
    }

    return (
        <>
            <ComponentHead add={add} addTitle={addTitle}/>
            <ComponentBody data={data} changeOrder={changeListOrder}/>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
  return {
    drawToRender:  get(state, `normalizer.data.${ownProps.storeName}.result.data`, []),
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
        const scheme = {data:{content: [ownProps.scheme]}};
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
      addItemRequest: ({attributes, formMethods, cb}) => {
          const storeName = ownProps.storeName;
          const entityName = ownProps.entityName;
          const scheme = {data: {content:ownProps.scheme}};
          dispatch({
              type: ApiActions.OPERATION_ADD.REQUEST,
              payload: {
                  attributes,
                  formMethods,
                  cb,
                  url: get(ownProps, 'addUrl', '#'),
                  config: {
                      ...ownProps.params,
                  },
                  scheme,
                  storeName,
                  entityName,
              },
          });
      },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
