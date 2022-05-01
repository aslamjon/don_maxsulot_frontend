import React, {memo} from "react";
import {get, isArray, isEmpty, isNil} from "lodash";
import CustomActionDropDown from "./CustomActionDropDown";

const CustomOptions = ({
                           options,
                           isMulti,
                           selectHandling,
                           selected,
                           action,
                           nullable,
                           clickDelete,
                           clickRename,
                           clickChangeColor,
                           searchValue,
                           isFixed,
                           disabledSomeOptions,
                           ignoreOption,
                           valueKey,
                           labelKey
                       }) => {
    const renderForMulti = ({index, ...other}) => {
        return (
            <div
                className={`select__body__options__option`}
                key={other[valueKey] + Math.floor(Math.random() * 100000000)}>
                <div className="content"
                     onClick={() => selectHandling(other)}>{other[labelKey]}</div>
                {(get(action, "edit", false) ||
                        get(action, "delete", false) ||
                        get(action, "create", false))
                    && <CustomActionDropDown
                        {...{
                            action,
                            color: '',
                            isMulti,
                            clickDelete,
                            clickRename,
                            clickChangeColor,
                            optionsIndex: index,
                            isFixed,
                            options
                        }} />}
            </div>
        )
    }

    const render = ({index, ...other}) => {
        let res = isArray(disabledSomeOptions) ? disabledSomeOptions.find(item => (get(item, valueKey, "") === other[valueKey])) : [];
        if (!isEmpty(ignoreOption)) {
            if (ignoreOption[other[valueKey]]) return "";
        }
        return (
            <div key={other[valueKey] + Math.floor(Math.random() * 100000000)}>
                {nullable && !index
                    && <div className={`select__body__options__option nullable`}>
                        <div className="content" onClick={() => selectHandling(null)}>-
                        </div>
                    </div>}
                <div
                    className={`select__body__options__option ${other[valueKey] === selected && "selected"} ${!isNil(res) ? "disabled" : ""}`}
                    data-index={index}>
                    <div className="content"
                         onClick={() => isNil(res) && selectHandling(other)}>{other[labelKey]}</div>
                    {(get(action, "edit", false) ||
                            get(action, "delete", false) ||
                            get(action, "create", false)) &&
                        <CustomActionDropDown
                            {...{
                                action,
                                color: '',
                                isMulti,
                                clickDelete,
                                clickRename,
                                clickChangeColor,
                                optionsIndex: index,
                                isFixed,
                                options
                            }} />}
                </div>
            </div>
        )
    }

    return (
        isEmpty(options)
            ? <div
                className="select__body__options__empty"> {(action.create && !isEmpty(searchValue)) ? "Press Enter or click create button" : "Result not found"} </div>
            : isArray(options) && options.map((val, index) => (
            !isMulti
                ? render({...val, index})
                : !selected.some(item => get(item, valueKey) === val[valueKey])
                && renderForMulti({...val, index})
        ))
    )
}
export default memo(CustomOptions);