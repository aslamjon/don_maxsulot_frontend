import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import {
  every,
  find,
  get,
  hasIn,
  head,
  includes,
  isArray,
  isEmpty,
  isEqual,
  isNil,
  orderBy,
  some,
  filter as lodashFilter,
} from "lodash";
import { Rating } from "react-simple-star-rating";
import Select from "../../../../components/elements/select/Select";
import Button from "../../../../components/elements/button";
import Icon from "../../../../components/elements/icon";
import FilterTemplates from "./filterTemplates";
import { TYPES as types } from "../../types";
import Dropdown from "../../../../components/elements/dropDown/dropdown";
import { withTranslation } from "react-i18next";
import classNames from "classnames";

const Style = styled.div`
  .rating-input {
    background: #fcfcfd;
    border: 1px solid #e6e8ec;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 10px;
    overflow: hidden;
    outline: none;
    max-width: 160px;
    margin-right: 8px;
    height: 40px;

    .ui__icon__wrapper.md {
      width: 22px !important;
      height: 17px !important;

      .icon {
        width: 17px !important;
        height: 17px !important;
      }
    }
  }

  .select__body {
    min-width: 200px !important;
  }

  .filter {
    padding: 20px;
    max-width: 720px;

    &.long {
      min-width: 720px;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      &__title {
        font-family: Poppins;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #b1b5c4;
      }

      &__clear {
        display: flex;
        align-items: center;

        button {
          background: rgba(55, 114, 255, 0.05);
          border-radius: 6px;
          font-family: Poppins;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          color: #3772ff;
          margin-right: 10px;
        }
      }
    }

    &__body {
      min-width: 380px;

      .multi-select-wrapper {
        .select__header .multiValueList .multiValue .exitBtn {
          height: 16px !important;
          width: 16px !important;
        }

        .select__header {
          height: 38px;
        }
      }

      .select__header__bottomArrow {
        .icon {
          background-color: rgba(119, 126, 144, 1);
          left: 78% !important;
        }
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;

        .select__body {
          .multiValue {
            font-size: 12px;
          }

          .select__body__options__search__input {
            font-size: 12px;
          }

          .content {
            font-size: 12px;
          }
        }

        .dropDown__body {
          .dropdawn {
            padding: 10px 0;
          }

          .drop_btn {
            padding: 0 30px 0 10px;
          }

          button {
            font-family: Poppins;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            color: #353945;
          }
        }

        .dropDown__button {
          display: flex;
          align-items: center;
          justify-content: center;

          button {
            /* background: transparent; */

            span {
              font-weight: 400;
              font-size: 12px;
            }

            &:hover {
              color: #fff;
            }
          }
        }

        .drop_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px 20px;

          button {
            background: transparent;

            span {
              font-weight: 400;
              font-size: 12px;
            }

            &:hover {
              color: #000;
            }
          }
        }

        .oneInput {
          background: #fcfcfd;
          border: 1px solid #e6e8ec;
          box-sizing: border-box;
          border-radius: 8px;
          padding: 10px;
          overflow: hidden;
          outline: none;
          max-width: 160px;
          margin-right: 8px;
          height: 40px;

          &.one {
            min-width: 310px;
          }
        }

        .noInput {
          margin-right: 38px;
          font-size: 12px;
          font-weight: 400;
          line-height: 12px;
        }

        .first-child {
          max-width: 78px;

          .select__header {
            max-width: 68px;
            height: 40px;
          }

          .select__header__content {
            display: inline-block;
            font-size: 12px;
            font-weight: 400;
            text-align: start;
            line-height: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 120px;
            color: #292d34;
            height: min-content;
          }
        }

        .second-child {
          width: 150px;

          .select__header {
            width: 140px;
            height: 40px;
          }

          .select__header__content {
            display: inline-block;
            font-size: 12px;
            font-weight: 400;
            text-align: start;
            line-height: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 120px;
            color: #292d34;
            height: min-content;
          }
        }

        .third-child {
          width: 100%;
          max-width: 105px;

          .select__header {
            height: 40px;
          }

          .select__header__content {
            display: inline-block;
            margin-right: 24px;
            align-items: start;
            text-align: start;
            padding: 0 10px;
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 75px;
            color: #292d34;
            height: min-content;
          }
        }

        .multi-select-wrapper {
          display: flex;
          border: 1px solid #ccc;
          border-radius: 8px;
          display: flex;
          align-items: center;
          margin-right: 8px;

          .select__header {
            border: none !important;
          }

          .select__header__content {
            display: inline-block;
            margin-right: 24px;
            align-items: start;
            text-align: start;
            padding: 0 10px;
            font-size: 12px;
            font-weight: 400;
            line-height: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 120px;
            color: #292d34;
            height: min-content;
          }
        }

        .last-input {
          min-width: 180px;
        }

        .close-fild {
          height: 34px;
          width: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(249, 250, 252, 1);
          border-radius: 50%;
        }

        .select {
          margin-right: 8px;

          &__header {
            font-family: Poppins;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
            color: #353945;
          }
        }
      }
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .dropDown__body {
        top: 64px;
        right: -11px;

        .template__body {
          min-width: 280px;
        }
      }

      .select {
        border-radius: 8px;

        &__header {
          background: rgb(69 178 107 / 7%);
          min-height: 34px !important;
          height: 34px;

          &__content {
            height: 34px;
            font-family: Poppins;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 24px;
            text-align: center;
            color: #45b36b;
          }
        }
      }

      &__templates {
        max-height: 34px;
        padding: 10px 15px;
        background: #f4f5f6;
        border: 1px solid #e6e8ec;
        box-sizing: border-box;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: Poppins;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        text-align: center;
        color: #353945;

        .ui__icon__wrapper.md {
          margin-right: 8px;

          .icon {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
`;

const Filter = ({ t, columns = [], filter = {}, filterView = () => {}, ...rest }) => {
  const [tempOpen, setTempOpen] = useState(false);
  const [filterOperator, setFilterOperator] = useState("AND");
  const [filterFields, setFilterFields] = useState([]);

  useEffect(() => {
    if (!isEmpty(filterFields)) {
      if (some(filterFields, "selectedLabel.isLastSelect") || every(filterFields, "value")) {
        // filterView(filterFields.map(({
        //     field,
        //     fieldType,
        //     compareOperatorType,
        //     customField,
        //     value,
        //     orderIndex
        // }) => ({
        //     field,
        //     fieldType,
        //     compareOperatorType,
        //     customField,
        //     value,
        //     orderIndex
        // })), filterOperator);
      }
    }
  }, [filterFields]);

  useEffect(() => {
    if (!isEmpty(filter) && !isEmpty(columns)) {
      setFilterOperator(get(filter, "filterOperator", "AND"));
      const filters = get(filter, "filterFields", []).map((item) => ({
        ...item,
        type: getType(types, getField(columns, get(item, "field"))),
        tempCompareOperatorType: get(item, "compareOperatorType"),
        typeOptions: get(getType(types, getField(columns, get(item, "field"))), "types"),
        selectedLabel: getSelectedLabel(
          getType(types, getField(columns, get(item, "field"))),
          getDefaultTypeOption(types, getField(columns, get(item, "field")))
        ),
        isLastSelect: !hasIn(
          getDefaultTypeOption(types, getField(columns, get(item, "field"))),
          "isLastSelect"
        ),
      }));
      setFilterFields(filters);
    }
  }, []);

  const addFilter = (value, index) => {
    const field = getField(columns, value);
    const type = getType(types, field);
    const defaultTypeOption = getDefaultTypeOption(types, field);
    if (get(filterFields, `${index}.field`, "") !== value) {
      if (!isNil(index)) {
        setFilterFields(
          filterFields.map((filter, number) =>
            isEqual(number, index)
              ? {
                  field: value,
                  fieldType: get(
                    find(columns, (column) => isEqual(get(column, "id"), value)),
                    "type"
                  ),
                  compareOperatorType: get(defaultTypeOption, "value"),
                  tempCompareOperatorType: get(defaultTypeOption, "value"),
                  selectedLabel: getSelectedLabel(type, defaultTypeOption),
                  customField: get(field, "customField"),
                  typeOptions: get(type, "types"),
                  type,
                }
              : filter
          )
        );
      } else {
        setFilterFields((filterFields) => [
          ...filterFields,
          {
            field: value,
            fieldType: get(
              find(columns, (column) => isEqual(get(column, "id"), value)),
              "type"
            ),
            compareOperatorType: get(defaultTypeOption, "value"),
            tempCompareOperatorType: get(defaultTypeOption, "value"),
            isLastSelect: !hasIn(defaultTypeOption, "isLastSelect"),
            selectedLabel: getSelectedLabel(type, defaultTypeOption),
            customField: get(field, "customField"),
            type,
            typeOptions: get(type, "types"),
          },
        ]);
      }
    }
  };

  const changeCompareOperatorType = (compareOperatorType, index) => {
    if (get(filterFields, `[${index}].compareOperatorType`, "") !== compareOperatorType) {
      setFilterFields(
        filterFields.map((filter, number) =>
          isEqual(number, index)
            ? {
                ...filter,
                tempCompareOperatorType: compareOperatorType,
                compareOperatorType,
                selectedLabel: get(filter, "type.types", []).find((item) =>
                  isEqual(get(item, "value"), compareOperatorType)
                ),
              }
            : filter
        )
      );
    }
  };
  const changeCompareOperatorTypeForLabel = (compareOperatorType, index) => {
    setFilterFields(
      filterFields.map((item, number) => {
        return isEqual(number, index)
          ? {
              ...item,
              compareOperatorType: isEqual(item.tempCompareOperatorType, "NOT_ANY")
                ? isEqual(compareOperatorType, "ANY")
                  ? "NOT_ANY"
                  : "NOT_ALL"
                : compareOperatorType,
            }
          : item;
      })
    );
  };

  const removeFilter = (name, isAll = false) => {
    if (isAll) {
      setFilterFields([]);
      filterView([], filterOperator);
    } else {
      const filters = lodashFilter(filterFields, (item) => !isEqual(get(item, "field"), name));
      setFilterFields(filters);
      if (filters.length == 0) {
        filterView([], filterOperator);
      }
    }
  };

  const getValue = ({ firstValue = null, secondValue = null, type = null, index }) => {
    setFilterFields(
      filterFields.map((filter, number) =>
        isEqual(number, index)
          ? includes(["SHORT_TEXT", "LONG_TEXT", "PHONE", "EMAIL"], type)
            ? {
                ...filter,
                value: { searchingValue: firstValue },
              }
            : includes(["RATING", "MONEY", "NUMBER"], type)
            ? {
                ...filter,
                value: {
                  minValue: firstValue ?? get(filter, "minValue"),
                  maxValue: secondValue ?? get(filter, "maxValue"),
                },
              }
            : isEqual(type, "DATE")
            ? {
                ...filter,
                value: {
                  dateCompareOperatorType: firstValue,
                  dateXValue: 1,
                  dateFilterType: get(
                    head(
                      get(
                        get(filter, "selectedLabel.children", []).find((item) =>
                          isEqual(get(item, "value"), firstValue)
                        ),
                        "children",
                        []
                      )
                    ),
                    "value"
                  ),
                },
              }
            : includes(["DROPDOWN", "LABELS"], type)
            ? {
                ...filter,
                value: {
                  optionsSelected: firstValue,
                },
              }
            : ""
          : filter
      )
    );
  };

  const getDateValue = ({ dateXValue, dateFilterType, index }) => {
    setFilterFields(
      filterFields.map((filter, number) =>
        isEqual(number, index)
          ? {
              ...filter,
              value: {
                ...filter.value,
                dateXValue: dateXValue ?? filter.value.dateXValue,
                dateFilterType: dateFilterType ?? filter.value.dateFilterType,
              },
            }
          : filter
      )
    );
  };

  const getDateOptions = (field) => {
    return get(field, "selectedLabel.children", []).find((child) =>
      isEqual(get(child, "value"), get(field, "value.dateCompareOperatorType"))
    );
  };

  const getField = (columns, value) => {
    return find(columns, (column) => isEqual(get(column, "id"), value));
  };

  const getType = (types, field) => {
    return find(types, (type) => isEqual(get(type, "name"), get(field, "type")));
  };

  const getDefaultTypeOption = (types, field) => {
    return head(
      get(
        find(types, (type) => isEqual(get(type, "name"), get(field, "type"))),
        "types"
      )
    );
  };

  const getSelectedLabel = (type, defaultTypeOption) => {
    return get(type, "types", []).find((item) =>
      isEqual(get(item, "value"), get(defaultTypeOption, "value"))
    );
  };

  return (
    <Style {...rest}>
      <div className={classNames("filter", { long: filterFields.length != 0 })}>
        <div className="filter__header">
          <span className="filter__header__title">{t("Active Filters") ?? "Active Filters"}</span>
          <div className="filter__header__clear">
            {!isEmpty(filterFields) && (
              <Button onCLick={() => removeFilter(null, true)}>
                {t("Clear all") ?? "Clear all"}
              </Button>
            )}
            <Icon icon="icon-question" />
          </div>
        </div>
        <div className="filter__body">
          {filterFields &&
            isArray(filterFields) &&
            filterFields.map((field, index) => (
              <div className="input-wrapper" key={index + 1}>
                {isEqual(index, 0) && (
                  <span className="noInput" style={{ width: "68px" }}>
                    {t("Where") ?? "Where"}
                  </span>
                )}

                {!isEqual(index, 0) && (
                  <Select
                    className="first-child selectContainer"
                    isSearchable={false}
                    defaultValue={filterOperator}
                    options={[
                      { label: "AND", value: "AND" },
                      { label: "OR", value: "OR" },
                    ]}
                    onChange={(value) => setFilterOperator(value)}
                    disable={!isEqual(index, 1)}
                  />
                )}

                <Select
                  className="second-child selectContainer"
                  defaultValue={get(field, "field")}
                  options={
                    isArray(columns) &&
                    columns.map(({ id, name }) => ({
                      value: id,
                      label: name,
                    }))
                  }
                  onChange={(value) => addFilter(value, index)}
                />

                <Select
                  isSearchable={false}
                  className="third-child selectContainer"
                  defaultValue={get(field, "compareOperatorType")}
                  options={get(field, "typeOptions")}
                  onChange={(value) => changeCompareOperatorType(value, index)}
                />

                {!get(field, "selectedLabel.isLastSelect", false) &&
                  (get(field, "selectedLabel.children", false) ? (
                    !isEqual(get(field, "fieldType", ""), "LABELS") ? (
                      <>
                        <Select
                          searchable={false}
                          className="fourth-child last-input selectContainer"
                          options={get(field, "selectedLabel.children", [])}
                          onChange={(value) =>
                            getValue({
                              firstValue: value,
                              type: get(field, "fieldType"),
                              index,
                            })
                          }
                        />
                        {get(getDateOptions(field), "hasNext", false) ? (
                          get(getDateOptions(field), "children", false) ? (
                            <>
                              {!get(getDateOptions(field), "inputNot", false) && (
                                <input
                                  value={get(field, "value.dateXValue")}
                                  className="oneInput"
                                  type="number"
                                  onChange={(e) =>
                                    getDateValue({
                                      dateXValue: e.target.value,
                                      index,
                                    })
                                  }
                                />
                              )}
                              <Select
                                isSearchable={false}
                                className="fourth-child last-input selectContainer"
                                defaultValue={get(field, "value.dateFilterType")}
                                options={get(getDateOptions(field), "children", [])}
                                onChange={(value) => getDateValue({ dateFilterType: value, index })}
                              />
                            </>
                          ) : (
                            <input type="date" />
                          )
                        ) : null}
                      </>
                    ) : (
                      <div className="multi-select-wrapper " style={{ display: "flex" }}>
                        <Select
                          className="fourth-child last-input multi-select-input"
                          options={get(
                            columns.find((column) =>
                              isEqual(get(column, "id"), get(field, "field"))
                            ),
                            "typeConfig.options"
                          ).map(({ id, label }) => ({
                            value: id,
                            label,
                          }))}
                          isMulti
                          onChange={(value) =>
                            getValue({
                              firstValue: value,
                              type: get(field, "fieldType"),
                              index,
                            })
                          }
                        />
                        <Dropdown
                          button={
                            <Button className="btn" semiBold>
                              <span>Any</span>
                            </Button>
                          }
                        >
                          <div className="dropdawn">
                            {get(field, "selectedLabel.children", []).map((item, i) => (
                              <Button
                                key={i + 1}
                                className="drop_btn"
                                onCLick={() =>
                                  changeCompareOperatorTypeForLabel(get(item, "value"), index)
                                }
                              >
                                {get(item, "label")}
                              </Button>
                            ))}
                          </div>
                        </Dropdown>
                      </div>
                    )
                  ) : get(field, "selectedLabel.hasNext", false) ? (
                    <Select
                      searchable={false}
                      className="fourth-child last-input selectContainer"
                      options={get(
                        columns.find((column) => isEqual(get(column, "id"), get(field, "field"))),
                        "typeConfig.options"
                      ).map(({ id, name }) => ({
                        value: id,
                        label: name,
                      }))}
                      onChange={(value) =>
                        getValue({
                          firstValue: [value],
                          type: get(field, "fieldType"),
                          index,
                        })
                      }
                    />
                  ) : get(field, "selectedLabel.twoInput", false) ? (
                    <>
                      <input
                        className="oneInput"
                        type="number"
                        onChange={(e) =>
                          getValue({
                            firstValue: e.target.value,
                            type: get(field, "fieldType"),
                            index,
                          })
                        }
                      />
                      <input
                        className="oneInput"
                        type="number"
                        onChange={(e) =>
                          getValue({
                            secondValue: e.target.value,
                            type: get(field, "fieldType"),
                            index,
                          })
                        }
                      />
                    </>
                  ) : (
                    <input
                      className="oneInput one"
                      onChange={(e) =>
                        getValue({
                          firstValue: e.target.value,
                          type: get(field, "fieldType"),
                          index,
                        })
                      }
                    />
                  ))}

                <div className="close-fild" onClick={() => removeFilter(get(field, "field"))}>
                  <Icon icon="icon-x-close" color="#353945" />
                </div>
              </div>
            ))}
        </div>
        {/*<div className="rating-input">*/}
        {/*    <Rating*/}
        {/*        emptySymbol={<Icon icon="icon-flag-outline" />}*/}
        {/*        fullSymbol={<Icon color="yellow" icon="icon-flag" />}*/}
        {/*    />*/}
        {/*</div>*/}
        <div className="filter__footer">
          <Select
            options={
              isArray(columns) &&
              orderBy(columns, ["name"], ["asc"]).map(({ id, name }) => ({
                value: id,
                label: name,
              }))
            }
            onChange={(value) => addFilter(value)}
            optionTitle={t("ADD FILTER") ?? "ADD FILTER"}
            customHeader={({ clickHeader }) => (
              <div className="select__header__content" onClick={clickHeader}>
                {t("+Add filter") ?? "+Add filter"}
              </div>
            )}
          />
          <Dropdown
            button={
              <div className="filter__footer__templates" onClick={() => setTempOpen(!tempOpen)}>
                <Icon icon="icon-magic-wand" />
                {t("Templates") ?? "Templates"}
              </div>
            }
          >
            <FilterTemplates />
          </Dropdown>
        </div>
      </div>
    </Style>
  );
};

export default withTranslation("pdp")(memo(Filter));
