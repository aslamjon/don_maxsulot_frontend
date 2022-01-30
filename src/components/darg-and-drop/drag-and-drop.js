import React, {useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from "styled-components";
import {find, get, isEqual, keys, round, values} from "lodash";
import {Row} from "react-grid-system";
import Column from "./column";
import {useDispatch} from "react-redux";
import Actions from "../../modules/settings/actions";

const Styled = styled.div`

`;

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

const DragAndDrop = ({
                         data = [], changeOrder = () => {}, ItemBody = () => {
    }, cols = {col1: {id: 'col1', items: []}}, itemSize, link = 'edit-module', ...rest
                     }) => {
    const [columns, setColumns] = useState(cols);
    const dispatch = useDispatch();


    useEffect(() => {
        setColumns(columns => ({...columns, col1: {...columns.col1, items: data}}));
    }, [data]);

    const changeListOrder = (result) => {
        if (!result.destination) return;
        const elements = Array.from(data);
        const [reorderedItem] = elements.splice(get(result,'source.index'), 1);
        elements.splice(get(result, 'destination.index'), 0, reorderedItem);
        changeOrder({
            data: {
                id: parseInt(get(result, 'draggableId')),
                top: get(find(data, (item, index) => isEqual(get(result, 'destination.index'), index)), 'orderIndex',null),
                bottom: get(find(data, (item, index) => isEqual(get(result, 'destination.index'), index + 1)), 'orderIndex',null)
            },
            request: ({
                          attributes,
                          formMethods,
                          cb
                      }) => dispatch({
                type: Actions.CHANGE_MODULE_OR_DEPARTMENT_OR_PAGE_ORDER.REQUEST,
                payload: {attributes:{link,...attributes}, formMethods, cb}
            })
        });
    }

    return (
        <Styled {...rest}>
            <Row>
                <DragDropContext onDragEnd={result => {
                    onDragEnd(result, columns, setColumns);
                    changeListOrder(result);
                }
                }>
                    {
                        values(columns).map(column => (
                            <Column col={round(12 / keys(cols).length)} ItemBody={ItemBody} column={column} changeOrder={changeOrder}
                                    key={column.id} itemSize={itemSize} link={link}/>
                        ))
                    }
                </DragDropContext>
            </Row>
        </Styled>
    );
};

export default DragAndDrop;
