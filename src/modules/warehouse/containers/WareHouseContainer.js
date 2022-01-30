import React, { useState } from 'react'
import { Table } from 'antd';
import Button from '../../../components/elements/button';
import Modal from '../../../components/elements/modal';


export default function WareHouseContainer({ columns, data }) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div>
            <Button onClick={() => setIsOpenModal(s => !s)} success> add </Button>
            <Modal active={isOpenModal} onClose={() => setIsOpenModal(s => !s)}>
                helloo
            </Modal>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}
