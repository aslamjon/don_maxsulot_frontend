import React, { useState } from "react";
import { Col, Row } from "react-grid-system";
import ListItem from "../../../../../containers/ListView/components/ListItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ComponentBody = ({ data = [], ...rest }) => {
  const [items, setItems] = useState(data);
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    console.log(result);
  };
  console.log("DATA", data, items);
  return (
    <Row>
      <Col xs={12}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {data &&
          data.map(({ name, id }) => (
            <ListItem key={id} title={name} id={id} />
          ))}
      </Col>
    </Row>
  );
};

export default ComponentBody;
