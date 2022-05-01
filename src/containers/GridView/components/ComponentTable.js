import React from 'react'
import styled, {css} from 'styled-components';
import {useTable, useFlexLayout, useResizeColumns} from 'react-table';
import {get, head, isArray, isBoolean, isObject, isString} from 'lodash';
import {withTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import Button from '../../../components/elements/button';
import Icon from './../../../components/elements/icon/icon';
import resize from "../../../assets/icons/ewResize.svg";
import Dropdown from '../../../components/elements/dropDown/dropdown';
import {formatDate} from "../../../utils";

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
        justify-content: start;

        &:first-child {
          padding-left: 18px;
          justify-content: flex-start;
          font-weight: 600 !important;
          font-size: 14px !important;
          line-height: 21px !important;
          flex: 0 0 auto !important;
          width: 40px !important;
        }

        :last-child {
          border-right: 0;
          padding-right: 24px;
          justify-content: flex-end;
        }

        .resizer {
          display: inline-block;
          width: 2px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
          transform: translateX(50%);
          z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
          touch-action: none;
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
              min-width: 70px;
              font-family: Poppins;
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 21px;
              text-align: center;
              color: #FCFCFD;
              padding: 4px 5px;
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

const ColorViewer = styled.span`
  padding: 4px 5px;
  ${({ color }) => color && css`
    background: ${color};
  `}
`;

const ComponentTable = ({
                            t,
                            data = [],
                            update = () => {
                            },
                            hasModal = {},
                            remove = () => {
                            },
                            columns = [],
                            redirect = {},
                        }) => {
    const history = useHistory();
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
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useFlexLayout,
        useResizeColumns
    );
    const getStatusValue = cell => {
        if (("status" in cell.column)) {
            if ((("customColumnTrue" in cell.column) && ("customColumnFalse" in cell.column)))
                return get(cell, "value") ? get(cell, "column.customColumnTrue","") : get(cell, "column.customColumnFalse","");
            else return (
                <Button className="statusBtn"
                        success={(cell.render('Cell').props.value === 'active') || (cell.render('Cell').props.value)}
                        danger={(cell.render('Cell').props.value === 'in active') || (!cell.render('Cell').props.value)}>
                    {cell.value ? "active" : "in active"}
                </Button>
            )
        }
    }

    const getActiveOrInactive = cell => {
        if ((cell.render('Cell').props.value === 'active') ||
            (cell.render('Cell').props.value === 'in active')) {
            return (
                <Button className="statusBtn"
                        success={(cell.render('Cell').props.value === 'active') || (cell.render('Cell').props.value)}
                        danger={(cell.render('Cell').props.value === 'in active') || (!cell.render('Cell').props.value)}>{`${cell.render('Cell').props.value}` || cell.render('Cell')}</Button>
            )
        }
    }

    const getAction = (cell, i) => {
        return (
            <Dropdown
                button={<Icon icon="icon-more-dots"
                              mainClassName="dropDown__button__icon"/>}
                options={[
                    <Button
                        className={'actionBtn edit'}
                        onClick={() => get(hasModal, "update", false)
                            ? update(get(data, `[${i}].id`, null))
                            : history.push(`${get(redirect, "update", '')}/${get(data, `[${i}].id`, null)}`)}>
                        <Icon icon="icon-edit" color="#777E91"/>
                        Edit
                    </Button>,
                    <Button
                        onCLick={() => remove(get(data, `[${i}].id`, null), isString(get(data, `[${i}].name`, '-'))
                            ? get(data, `[${i}].name`, '-')
                            : get(data, `[${i}].name.props.children`, '-'))}
                        className={'actionBtn delete'}>
                        <Icon icon="icon-recycle" color="#777E91"/>
                        {t("Delete") ?? 'Delete'}
                    </Button>
                ]}/>
        )
    }

    const getDate = (cell) => {
        if (isBoolean(get(cell, "column.date")) && ("format" in cell.column)) {
            return <span className={"dateFormat"}>{ formatDate( new Date(get(cell, "value")), get(cell, "column.format")) }</span>
        } return <span>{cell.render('Cell')}</span>;
    }

    const getColor = (cell) => {
        if (isObject(cell.column.color) && ("colorCode" in cell.column.color) && ("name" in cell.column.color) && isObject(cell.value)) {
            return <ColorViewer color={get(cell, `value[${cell.column.color.colorCode}]`)} className={"colorViewer"} >{ get(cell, `value[${cell.column.color.name}]`) }</ColorViewer>
        } return <span>{cell.render('Cell')}</span>;
    }



    const getColumn = ({ cell, i }) => {
        if ("customColumn" in cell.column) return cell.column.customColumn({ column: cell.column, cell });
        else if ("status" in cell.column) return getStatusValue(cell);
        else if ((cell.render('Cell').props.value === 'active') || (cell.render('Cell').props.value === 'in active')) return getActiveOrInactive(cell);
        else if (cell.render('Cell').props.value === 'action') return getAction(cell, i);
        else if ("date" in cell.column) return getDate(cell);
        else if ("color" in cell.column) return getColor(cell);
        else return (<span>{cell.render('Cell')}</span>);
    };

    return (
        <TableStyle length={columns.length} {...{columnWidth: 200}}>
            <div>
                <div {...getTableProps()} className="table">
                    <div>
                        {headerGroups && isArray(headerGroups) && headerGroups.map(headerGroup => (
                            <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                {headerGroup.headers.map(column => (
                                    <div {...column.getHeaderProps()} className="th">
                                        {t(column.render('Header')) ?? column.render('Header')}
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
                        {rows && isArray(rows) && rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <div {...row.getRowProps()} className="tr" onClick={() => {
                                    if ( "clickRow" in head(columns)) head(columns).clickRow(row.original);
                                }}>
                                    {row.cells.map(cell => {
                                        return (
                                            <div
                                                {...cell.getCellProps()}
                                                className="td"
                                                // data-tip={
                                                //     (get(cell.render('Cell').props, "value.props.children", "").length > 15)
                                                //         ? get(cell.render('Cell').props, "value.props.children", "")
                                                //         : (get(cell.render('Cell').props, "value", "").length > 15)
                                                //             ? get(cell.render('Cell').props, "value", "")
                                                //             : null}
                                                data-place={"bottom"}
                                                data-effect={"solid"}
                                                data-for={"td"}>
                                                { getColumn({ cell, i }) }
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

export default withTranslation('pdp')(ComponentTable);
