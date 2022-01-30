import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {get, isEmpty, isNil} from "lodash";
import InfiniteScroll from 'react-infinite-scroller';
import {InitialLoader} from "../../components/loader";
import Normalizer from "../../services/normalizer";
import ApiActions from "../../services/api/actions";
import ComponentDefaultBody from "./components/ComponentBody";
import ComponentDefaultHead from "./components/ComponentHead";
import {toast} from "react-toastify";


const GridView = ({
                      ComponentHead = ComponentDefaultHead,
                      ComponentBody = ComponentDefaultBody,
                      ModalBody,
                      callToRender,
                      callToRenderTrigger,
                      drawToRender,
                      scheme,
                      isFetched,
                      size,
                      entities,
                      addItemRequest,
                      deleteItemRequest,
                      getOneRequest,
                      item,
                      updateItemRequest,
                      getOneTrigger,
                      hasNext,
                      page,
                      columns,
                      row,
                      modalTitle = '',
                      ...rest
                  }) => {
    const [openModal, setOpenModal] = useState(false);
    const [removeConfirm, setRemoveConfirm] = useState({id: null, text: null});

    useEffect(() => {
        if (isEmpty(drawToRender)) {
            callToRender({page, size});
        }
    }, []);

    const addOrEdit = (id = null, {data, setError}) => {
        if (isNil(id)) {
            add({attributes: {...data}, formMethods: {setError}});
        } else {
            update({id, attributes: {...data}, formMethods: {setError}});
        }
    }

    const add = ({attributes, formMethods}) => {
        addItemRequest({
            attributes, formMethods, cb: {
                success: ({message = 'SUCCESS'}) => {
                    toast.success(message);
                    setOpenModal(false);
                    emptyRemoveText()
                },
                fail: () => {

                }
            }
        })
    };
    const update = ({id, attributes, formMethods}) => {
        updateItemRequest({
            id, attributes, formMethods, cb: {
                success: ({message = 'SUCCESS'}) => {
                    toast.success(message);
                    setOpenModal(false);
                    emptyRemoveText()
                },
                fail: () => {

                }
            }
        })
    };

    const remove = (id) => {
        deleteItemRequest({
            id, formMethods: {}, cb: {
                success: ({message = 'SUCCESS'}) => {
                    setOpenModal(false);
                    emptyRemoveText();
                    toast.success(message);
                    callToRender();
                },
                fail: () => {

                }
            }
        })
    };

    const openModalOrLink = () => {
        getOneTrigger();
        setOpenModal(true);
    }

    const emptyRemoveText = () => {
        setRemoveConfirm({id: null, text: null});
    }

    let data = Normalizer.Denormalize(drawToRender, [scheme], entities);
    item = Normalizer.Denormalize(item, {result: {data: scheme}}, entities);


    if (!isFetched) {
        return <InitialLoader/>
    }

    const loadMore = () => {
        if (isFetched) {
            // callToRender({page, size});
        }
    }


    return (<>
            <ComponentHead buttonText={'Create new'} openModalOrLink={openModalOrLink}/>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={false && isFetched && hasNext}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                <ComponentBody
                    ModalBody={ModalBody}
                    remove={remove}
                    removeConfirm={removeConfirm}
                    open={openModal}
                    setOpenModal={(id, name) => {
                        setOpenModal(true);
                        setRemoveConfirm({id, name})
                    }}
                    closeModal={() => {
                        setOpenModal(false);
                        emptyRemoveText()
                    }}
                    data={data}
                    addOrEdit={addOrEdit}
                    getOneRequest={(id) => {
                        getOneRequest(id);
                        setOpenModal(true);
                    }}
                    item={item}
                    columns={columns}
                    row={row}
                    modalTitle={modalTitle}
                />
            </InfiniteScroll>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        drawToRender: get(state, `normalizer.data.${ownProps.storeName}.result.data.content`, []),
        isFetched: get(
            state,
            `normalizer.data.${ownProps.storeName}.isFetched`,
            false
        ),
        page: get(
            state,
            `normalizer.data.${ownProps.storeName}.result.data.number`,
            0
        ),
        size: get(
            state,
            `normalizer.data.${ownProps.storeName}.result.data.size`,
            15
        ),
        hasNext: get(
            state,
            `normalizer.data.${ownProps.storeName}.result.data.hasNext`,
            false
        ),
        entities: get(state, "normalizer.entities", {}),
        item: get(state, `normalizer.data.${ownProps.entityName}-one`, {}),
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        callToRender: (params = {size: 15}) => {
            const storeName = ownProps.storeName;
            const entityName = ownProps.storeName;
            const scheme = {data: {content: [ownProps.scheme]}};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: get(ownProps, 'url.list', '#'),
                    baseUrl: ownProps.baseUrl,
                    config: {
                        params: {
                            ...params,
                            ...ownProps.params
                        }
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
        addItemRequest: ({ attributes, formMethods, cb }) => {
            const storeName = ownProps.storeName;
            const entityName = ownProps.entityName;
            const scheme = {data: ownProps.scheme};
            dispatch({
                type: ApiActions.OPERATION_ADD.REQUEST,
                payload: {
                    attributes,
                    formMethods,
                    cb,
                    url: get(ownProps, 'url.add', '#'),
                    config: {
                        ...ownProps.params,
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        updateItemRequest: ({id, attributes, formMethods, cb}) => {
            const storeName = ownProps.storeName;
            const entityName = ownProps.entityName;
            const scheme = {data: ownProps.scheme};
            dispatch({
                type: ApiActions.OPERATION_UPDATE.REQUEST,
                payload: {
                    attributes,
                    formMethods,
                    cb,
                    url: `${get(ownProps, 'url.update', '#')}/${id}`,
                    config: {
                        ...ownProps.params,
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        deleteItemRequest: ({id, formMethods, cb}) => {
            const storeName = ownProps.storeName;
            const entityName = ownProps.entityName;
            const scheme = ownProps.scheme;
            dispatch({
                type: ApiActions.OPERATION_DELETE.REQUEST,
                payload: {
                    id,
                    formMethods,
                    cb,
                    url: `${get(ownProps, `url.delete`, '#')}/${id}`,
                    config: {
                        ...ownProps.params,
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getOneRequest: (id) => {
            const storeName = `${ownProps.entityName}-one`;
            const entityName = ownProps.entityName;
            const scheme = {data: ownProps.scheme};
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `${get(ownProps, 'url.one')}/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        getOneTrigger: () => {
            const storeName = `${ownProps.entityName}-one`;
            dispatch({
                type: ApiActions.GET_ONE.TRIGGER,
                payload: {
                    storeName,
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridView);
