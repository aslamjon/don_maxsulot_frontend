import React from 'react';
import styled, { css } from 'styled-components'
import { useTable, useBlockLayout, useResizeColumns } from 'react-table'
import resize from "../../assets/icons/ewResize.svg";

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid #E6E8EC;

    .tr {
      &:first-child {
        display: none !important;
      }
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #E6E8EC;
      border-right: 1px solid #E6E8EC;

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }
      
      .resizer {
        display: inline-block;
        background: #777E90;
        width: 0px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        transition: 0.3s;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
        cursor: url(${resize}) 14 5, auto !important;
        &.isResizing {
          /* background: red; */
        }
      }
    }
    .th {
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
        color: #777E91;
        background: #FAFAFB;
        transition: 0.2s;
        &:hover {
          background: rgba(240,240,241,1);
          .resizer {
            width: 2px;
          }
        }
        ${({ isNumber }) => isNumber && css`
          &:first-child {
            text-align: center;
            font-size: 14px;
          }
        `}
      }
      div[role="rowgroup"] {
        .tr {
          &:first-child {
            display: flex !important;
          }
          .td {
            font-weight: 500;
            font-size: 14px;
            line-height: 15px;
            color: #353945;
            background: #FCFCFD;
            transition: 0.2s;
            ${({ isNumber }) => isNumber && css`
              &:first-child {
                text-align: center;
              }
            `}
          }
        }
      }
  }
`


const DataGrid = ({ columns, data, isNumber=true, ...rest }) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 50,
      width: 200,
      maxWidth: 800,
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
  )

  return (
    <Styles {...{ isNumber }}>
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
                      className={`resizer ${column.isResizing ? 'isResizing' : ''
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
                  {row.cells.map(cell => ( <div {...cell.getCellProps()} className="td">
                      {cell.render('Cell')}
                    </div>))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Styles>
  )
};

export default DataGrid;
