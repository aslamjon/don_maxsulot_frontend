import React from 'react'
import styled from 'styled-components';
import { Col, Row } from "react-grid-system";
import { get, isNil } from "lodash";
import ComponentTable from "./ComponentTable";
import Box from "../../../components/elements/box";
import DeleteModalBody from "./DeleteModalBody";
import Modal from "../../../components/elements/modal";
import Title from "../../../components/elements/title";
import Icon from "../../../components/elements/icon";

const ComponentBodyStyle = styled.div`
  padding: 15px;
  background-color: #fff;
  margin-top: 36px;
  border-radius: 8px;

  .modal__body {
    min-height: 0;
    h2 {
      &.title {
          font-weight: 600;
          font-size: 14px;
          line-height: 21px;
          color: #777E91;
          margin-left: 1px;
      }
    }
  }
`;

const ComponentBody = ({
                           data = [],
                           update = () => {
                           },
                           remove = () => {
                           },
                           addOrEdit = () => {
                           },
                           setOpenModal = () => {
                           },
                           getOneRequest = () => {
                           },
                           Form,
                           ModalBody = DeleteModalBody,
                           hasModal = false,
                           open = false,
                           closeModal = () => {
                           },
                           item = {},
                           removeConfirm = {},
                           columns = [],
                           row = [],
                           modalTitle='',
                           ...rest
                       }) => {
    const ModalBodyItem = (isNil(get(removeConfirm, 'id', null))) ? ModalBody : DeleteModalBody;

    let items = data.map(({...row}, index) => ({
        ...row,
        number: index + 1,
        status: row['active'] ? 'active' : 'in active',
        action: 'action'
    }));
    return (
        <Box sm gray>
            <Row>
                <Col xs={12}>
                    <ComponentBodyStyle {...rest}>
                        <Modal active={open} onClose={closeModal}>
                            <Title className="title" sm
                                   semiBold>{(isNil(get(removeConfirm, 'id', null))) ? (!isNil(get(item, 'entityName', null) || get(item, 'result', null)) ? `EDIT ${modalTitle}` : `ADD ${modalTitle}`) : `DELETE ${modalTitle}`}
                                </Title>
                            {!isNil(get(item, 'entityName', null) || get(item, 'result', null)) ? (get(item, 'isFetched', false) ?
                                <ModalBodyItem item={get(item, 'result.data', {})} btnText={'Edit'}
                                               addOrEdit={(id, data) => addOrEdit(id, data)} cancel={closeModal}
                                               remove={remove}
                                               id={get(removeConfirm, 'id', null)}
                                               confirmText={get(removeConfirm, 'name', '-')}/> : 'Loading ....') :
                                <ModalBodyItem item={get(item, 'result.data', {})}
                                               addOrEdit={(id, data) => addOrEdit(id, data)} cancel={closeModal}
                                               remove={remove}
                                               id={get(removeConfirm, 'id', null)}
                                               btnText={'Add'}
                                               confirmText={get(removeConfirm, 'name', '-')}/>}
                        </Modal>
                        <ComponentTable data={items} columns={columns} remove={setOpenModal} update={getOneRequest}/>
                    </ComponentBodyStyle>
                </Col>
            </Row>
        </Box>
    )
}

export default ComponentBody;