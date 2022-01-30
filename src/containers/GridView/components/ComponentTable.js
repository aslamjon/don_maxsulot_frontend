import React from 'react'
import styled, { css } from 'styled-components'
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'
import { get, isArray } from 'lodash';
import Button from '../../../components/elements/button';
import Icon from './../../../components/elements/icon/icon';

import edit2 from "../../../assets/icons/edit2.svg";
import recycle from "../../../assets/icons/trash-icon.svg";
import resize from "../../../assets/icons/ewResize.svg";
import Dropdown from '../../../components/elements/dropDown/dropdown';

const TableStyle = styled.div`
  .table {
    display: inline-block;
    border-spacing: 0;
    width: 100%;
    
    .td, .th, .tr {
      flex-shrink: 1 !important;
      min-width: auto !important;
    }
    .tr {
      background: #F9F9F9;
      border-radius: 6px;
      width: 100% !important;
      margin-bottom: 10px;
      height: 40px;
      &:first-child {
        display: none !important;
      }
      background: #353945;
      padding: 5px;
      .th {
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #F4F5F6;
        
        &:hover {
          background: #23262F;
          border-radius: 4px;
        }
      }
      .th,
      .td {
        position: relative;
        display: flex !important;
        align-items: center;
        padding: 0 10px;
        justify-content: center;
        flex-grow: 1;
        &:first-child{
          justify-content: flex-start;
          flex-grow: 0;
          padding-left: 18px;
        }
   
        :last-child {
          border-right: 0;
          justify-content: flex-end;
          flex-grow: 0;
          padding-right: 24px;
        }
  
        .resizer {
          display: inline-block;
          /* background: blue; */
          width: 2px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          transform: translateX(50%);
          z-index: 1;
          ${'' /* prevents from scrolling while dragging on touch devices */}
          touch-action:none;
          cursor: url(${resize}) 14 5, auto !important;
          &.isResizing {
            /* background: red; */
          }
        }
      }
    }
    div[role="rowgroup"] {
      .tr {
        background: #F9F9F9;
        display: flex !important;
        margin-bottom: 6px;
        .td {
          font-weight: 500;
          font-size: 14px;
          line-height: 21px;
          color: #353945;
          &:last-child {
            display: flex !important;
          }
          .statusBtn {
            button {
              border-radius: 5px;
              width: 70px;
              height: 24px;
              font-weight: 600;
              font-size: 10px;
              line-height: 15px;
              text-align: center;
              color: #FCFCFD;
              padding-top: 4px;
              padding-bottom: 4px;
            }
          }
          .actionBtn {
            margin: 11px 15px;
            button {
              width: 100%;
              border: none;
              border-radius: 0px;
              background: transparent;
              padding: 0;
              display: flex;
              align-items: center;
              font-weight: normal;
              font-size: 14px;
              line-height: 21px;
              color: #777E91;
              .ui__icon__wrapper {
                margin-right: 15px;
              }
              &:hover {
                background: transparent;
                color: #777E91;
              }
              
            }
          }
          .edit {
            button {
              &:hover {
                color: #45B36B;
                .icon {
                  background-color: #45B36B;
                }
              }
            }
          }
          .delete {
            button {
              &:hover {
                color: #EF466F;
                .icon {
                  background-color: #EF466F;
                }
              }
            }
          }
        }
      }
    }
  }
  .dropDown {
    margin-right: 7px;
    &__button {
      &__icon {
        .icon {
          width: 30px !important;
        }
      }
    }
  }
`;
export default function ComponentTable({ 
  data = [], 
  update = () => {}, 
  remove = () => {}, 
  columns = [] }) {
      const defaultColumn = React.useMemo(
        () => ({
          minWidth: 30,
          width: 200,
          maxWidth: 500,
        }),
        []
      )
        
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        resetResizing,
      } = useTable(
        {
          columns,
          data,
          defaultColumn,
        },
        useBlockLayout,
        useResizeColumns
      );
    return (
      <TableStyle length={columns.length} {...{columnWidth: 200}}>
      {/* <button onClick={resetResizing}>Reset Resizing</button> */}
      <div>
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className="td">
                        {(cell.render('Cell').props.value === 'active' || cell.render('Cell').props.value === 'in active')
                          ? <Button className="statusBtn" success={cell.render('Cell').props.value === 'active'} danger={cell.render('Cell').props.value === 'in active'}>{cell.render('Cell')}</Button> 
                          : cell.render('Cell').props.value === 'action' 
                            ? <Dropdown 
                                button={<Icon icon="icon-more-dots" mainClassName="dropDown__button__icon"/>} 
                                options={[
                                  <Button className={'actionBtn edit'} onClick={()=>update(get(data,`[${i}].id`,null))} >
                                    {/* <img src={edit2} alt="edit2" /> */}
                                    <Icon icon="icon-edit" color="#777E91" />
                                    Edit 
                                  </Button>,
                                  <Button onCLick={()=>remove(get(data,`[${i}].id`,null),get(data,`[${i}].name`,'-'))} className={'actionBtn delete'}>
                                    {/* <img src={recycle} alt="trash" /> */}
                                    <Icon icon="icon-recycle" color="#777E91" />
                                    Delete
                                  </Button>
                                  ]}/>
                            : cell.render('Cell')}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </TableStyle>
    )
}
