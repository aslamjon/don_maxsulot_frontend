import React from 'react';
import styled from 'styled-components';
import { useTable, useBlockLayout } from 'react-table';
import { useSticky } from 'react-table-sticky';

const Styles = styled.div`
  .table {
    border: 1px solid #ddd;
 
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
 
    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;
 
      :last-child {
        border-right: 0;
      }
    }
 
    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }
 
      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }
 
      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }
 
      .body {
        position: relative;
        z-index: 0;
      }
 
      [data-sticky-td] {
        position: sticky;
      }
 
      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }
 
      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;

const TableSticky = ({...rest}) =>  {
    const columns = [
        {
            Header: 'First Name',
            accessor: 'firstName',
            sticky: 'left',
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
            sticky: 'left',
        },
        ...
            {
                Header: 'age',
                accessor: 'age',
                sticky: 'right',
            }
    ]

    const data = [

    ]

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useBlockLayout,
        useSticky,
    );

    const footerGroups = headerGroups.slice().reverse();

    return (
        <Styles>
            <div {...getTableProps()} className="table sticky" style={{ width: 1000, height: 500 }}>
                <div className="header">
                    {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className="tr">
                            {headerGroup.headers.map((column) => (
                                <div {...column.getHeaderProps()} className="th">
                                    {column.render('Header')}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()} className="body">
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <div {...row.getRowProps()} className="tr">
                                {row.cells.map((cell) => (
                                    <div {...cell.getCellProps()} className="td">
                                        {cell.render('Cell')}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
                <div className="footer">
                    {footerGroups.map((footerGroup) => (
                        <div {...footerGroup.getHeaderGroupProps()} className="tr">
                            {footerGroup.headers.map((column) => (
                                <div {...column.getHeaderProps()} className="td">
                                    {column.render('Footer')}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </Styles>
    );
}

export default TableSticky;