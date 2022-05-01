import React, {memo, useEffect, useState} from "react";
import {get, head, isArray, isEmpty, isNil, isNull, isNumber} from "lodash";
import OutsideClickHandler from "react-outside-click-handler";
import {SelectStyled} from "./selectStyled";
import {getSelectOptionsListFromData} from "../../../utils";
import SimpleBar from "simplebar-react";
// import ColorPicker from "../colorPicker/colorPicker";
import {connect} from "react-redux";
import ApiActions from "../../../services/api/actions";
import {colors} from "../../../mock/colors";
import CustomActionDropDownn from "./components/CustomActionDropDown";
import CustomMultiLabelComponent from "./components/CustomMultiLabel";
import CustomOptionsComponent from "./components/CustomOptions";
import CustomHeaderComponent from "./components/CustomHeader";
import CustomIconComponent from "./components/CustomIcon";

const Select = ({
                    checked,
                    error,
                    onChange = () => { },
                    inputOnChange = () => '',
                    getActionValue = () => '',
                    onClose = () => "",

                    options = [],
                    childClassNames = [],
                    defaultValue = {},
                    action = {},
                    disabledSomeOptions = [],
                    ignoreOption = {},

                    otherDataForAction = "",
                    maxShowSelected = 2,
                    value = "",
                    optionTitle = "",
                    placeholder = "Select",
                    searchPlaceholder = "Type to search...",
                    name = "",
                    className = "",
                    onChangeKey = "value",
                    valueKey = "value",
                    labelKey = "label",


                    editable = true,
                    disabled = false,
                    isSearchable = true,
                    isMulti = false,
                    isClearAll = false,
                    nullable = true,
                    isChangeDefaultValue = true,
                    hideRemoveIcon = false,
                    defaultHideAnimation = true,
                    isFixed = false,

                    CustomActionDropDown = CustomActionDropDownn,
                    MultiLabel = CustomMultiLabelComponent,
                    CustomOption = CustomOptionsComponent,
                    CustomHeader = CustomHeaderComponent,
                    CustomIcon = CustomIconComponent,

                    actionOptions,
                    ...props
                }) => {
    const [viewSelectOption, setViewSelectOption] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [optionsState, setOptionsState] = useState([]);
    const [selected, setSelected] = useState([]);
    const [optionsDisabled, setOptionsDisabled] = useState(false);
    const [colorPicker, setColorPicker] = useState(false);
    // const [color, setColor] = useState("");
    // const [state, setState] = useState({
    //     color: {},
    //
    // });

    // OPTIONS SELECT HANDLING
    const selectHandling = val => {
        let res = (isArray(disabledSomeOptions) && !isNull(val))
            ? disabledSomeOptions.find(item => (get(item, valueKey,"") === val[valueKey]))
            : [];

        if (editable && !optionsDisabled && ( isNull(val) ? true : isNil(res))) {
            if (isMulti) {
                onChange([...selected.map(item => item[valueKey]), val[valueKey]], selected);
                setSelected(s => [...s, val]);
                // (selected.length === options.length - 1) && setViewSelectOption((state) => !state);
            } else {
                if (isNull(val)) {
                    onChange('');
                    setViewSelectOption((state) => !state);
                    setSelected("");
                    defaultValue && onClose(val);
                } else {
                    onChange(get(val, onChangeKey, get(val, valueKey,"")), val);
                    setViewSelectOption((state) => !state);
                    setSelected(val);
                    onClose(get(val, onChangeKey, get(val, valueKey,"")), val);
                }
            }
        }
    };

    // UNDO FOR X ICONS IN MULTI SELECT
    const undoSelected = (index) => {
        if (editable) {
            selected.splice(index, 1);
            if (isMulti) {
                setSelected([...selected]);
                onChange(selected.map(it => it[valueKey]), selected);
            } else {
                setSelected({...selected});
                onChange(selected);
            }
        }
    }

    // CLEAR ALL
    const clearAll = () => {
        if (isClearAll) {
            onChange([]);
            setSelected([]);
        }
    }

    // SEARCH DOES WORK
    const searchChange = (e) => {
        const {target: {value}} = e;
        // set value for control in input
        setSearchValue(value);
        if (!optionsDisabled) {
            // search data
            options = options.filter((val) => val[labelKey].toLocaleLowerCase().startsWith(value.toLocaleLowerCase()));
            // set Options for showing display
            setOptionsState(options);
            inputOnChange(e);
        }
    }

    // START API
    const createButtonHandling = (value) =>{
        value = value.trim();
        options = options.filter((val) => val[labelKey].toLocaleLowerCase() === value.toLocaleLowerCase());
        if (isEmpty(options) && get(action, "create", false) && !optionsDisabled && !isEmpty(value)) {
            actionOptions({
                attributes: {
                    name: value,
                    method: "CREATE",
                    colorCode: colors[Math.floor(Math.random() * colors.length)],
                    ...otherDataForAction
                }, formMethods: {},
                url: action.url,
                cb: {
                    success: (normalizeData,res) => {
                        let options = get(res, "data", []);
                        getActionValue({options, name});
                        if (!isEmpty(options)) {
                            options = getSelectOptionsListFromData(options, 'id', 'name');
                            setOptionsState(options);
                        }
                    },
                    fail: (res) => {
                    }
                }
            })
            setSearchValue("");
            setOptionsDisabled(false);
        }
        if (get(action, "edit", false) && optionsDisabled && !isEmpty(value)) {
            actionOptions({
                attributes: {
                    name: value,
                    id: optionsDisabled,
                    method: "EDIT",
                    ...otherDataForAction
                }, formMethods: {},
                url: action.url,
                cb: {
                    success: (normalizeData,res) => {
                        let options = get(res, "data", []);
                        getActionValue({options, name});
                        if (!isEmpty(options)) {
                            options = getSelectOptionsListFromData(options, 'id', 'name');
                            setOptionsState(options);
                        }
                    },
                    fail: (res) => {
                    }
                },
            })
            setSearchValue("");
            setOptionsDisabled(false);
        }
    }

    // SEARCH ENTER KEY HANDLING
    const handlingKye = (e) => {
        if (e.code === "Enter") {
            let {target: {value}} = e;
            e.preventDefault();
            createButtonHandling(value);
        }
    }


    let clickDelete = ({optionsIndex, selectedIndex}) => {
        if (isNumber(optionsIndex)) {
            let value = options[optionsIndex];
            if (value) {
                actionOptions({
                    attributes: {...value, id: value[valueKey], name: value[labelKey], method: "DELETE", ...otherDataForAction},
                    formMethods: {},
                    url: action.url,
                    cb: {
                        success: (normalizeData,res) => {
                            let options = get(res, "data", []);
                            getActionValue({options, name});
                            if (!isEmpty(options)) {
                                options = getSelectOptionsListFromData(options, 'id', 'name');
                                setOptionsState(options);
                            }
                        },
                        fail: (res) => {
                        }
                    },
                });
            }
        } else if (isNumber(selectedIndex)) {
            //  this place for multi select
        }
    };

    let clickRename = ({optionsIndex, selectedIndex}) => {
        if (isNumber(optionsIndex)) {
            let value = options[optionsIndex];
            setOptionsDisabled(value[valueKey]);
            setSearchValue(value[labelKey]);
        } else if (isNumber(selectedIndex)) {
            //  this place for multi select
        }
    };

    let clickChangeColor = ({optionsIndex, selectedIndex}) => {
        setColorPicker(s => !s);
    };
    // END API

    const clickHeader = (e) => {
        !disabled && setViewSelectOption((state) => !state)
    };

    useEffect(() => {
        // if (!isEmpty(options)) setOptionsState(options);
        setOptionsState(options);
    },[options]);

    useEffect(() => {
        if (isMulti) {
            if (!isEmpty(defaultValue) && !isNull(defaultValue)) {
                isChangeDefaultValue && onChange([...defaultValue], defaultValue);
                setSelected(options.filter((val) => !!defaultValue?.find((i) => i == get(val, valueKey))) );
            } else if (isNull(defaultValue)) {
                setSelected([]);
                setOptionsState([]);
            }

        } else if (!isEmpty(defaultValue) || (isNumber(defaultValue))) {
            let value = options.find((i) => i[valueKey] == (isArray(defaultValue) ? head(defaultValue) : defaultValue));
            if (!value) value = optionsState.find((i) => i[valueKey] == (isArray(defaultValue) ? head(defaultValue) : defaultValue));

            isChangeDefaultValue && onChange(get(value, valueKey, null), value);
            setSelected(value ?? "");
        }
    }, [defaultValue, options]);


    const clickOutside = () => {
        if (viewSelectOption && isMulti) {
            setViewSelectOption(false);
            if (!isEmpty(selected) || defaultValue) {
                onClose([...selected.map(item => item[valueKey])]);
            }
        } else if (viewSelectOption && !isMulti) {
            setViewSelectOption(false);
        }
    }

    return (
        <SelectStyled {...{
            ...props,
            action: (action.create || action.edit || action.delete)
                ? "true"
                : null,
            optionsDisabled: optionsDisabled ? "true" : "",
            active: viewSelectOption ? 'active' : '',
            checked: checked ? checked : '',
            error: error ? "error" : '',
            className,
            defaultHideAnimation,
            isFixed
        }}  >
            <OutsideClickHandler onOutsideClick={clickOutside}>
                <div className={`select ${viewSelectOption && 'active'} ${isMulti && "multi"}`}>
                    <div className={`select__header ${!isMulti && !isEmpty(selected) && "optionSelected"}`}
                    >
                        <CustomHeader {...{
                            value,
                            isMulti,
                            undo: undoSelected,
                            maxShowSelected,
                            selected,
                            defaultValue,
                            placeholder,
                            CustomIcon,
                            options,
                            action,
                            editable,
                            isClearAll,
                            clearAll,
                            clickHeader,
                            hideRemoveIcon,
                            isFixed,
                            clickDelete,
                            clickRename,
                            clickChangeColor,
                            valueKey,
                            labelKey
                        }} />
                    </div>
                    <div className={`select__body`}>
                        <SimpleBar className="select__body__options">
                            {optionTitle && <div className="select__body__options__title">{optionTitle}</div>}
                            {!isEmpty(selected) && <div className="select__body__options__selected">
                                {isMulti && <MultiLabel {...{
                                    data: selected,
                                    undo: undoSelected,
                                    selected,
                                    defaultValue,
                                    options,
                                    action,
                                    editable,
                                    clickDelete,
                                    clickRename,
                                    clickChangeColor,
                                    isFixed,
                                    valueKey,
                                    labelKey
                                }} /> }
                            </div>}

                            {isSearchable && <div className="select__body__options__search">
                                <input
                                    type="text"
                                    autoFocus={viewSelectOption}
                                    ref={inputElement => inputElement && viewSelectOption && inputElement.focus()}
                                    className="select__body__options__search__input"
                                    placeholder={searchPlaceholder}
                                    value={searchValue}
                                    onChange={searchChange}
                                    onKeyPress={handlingKye}
                                />
                            </div>}
                            <CustomOption {...{
                                options: optionsState,
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
                            }} />
                            {action.create
                                && isEmpty(optionsState)
                                && !isEmpty(searchValue)
                                && <div
                                    className="select__body__options__footer"
                                    onClick={() => createButtonHandling(searchValue)}>
                                    <div className="select__body__options__footer__button">+ create</div>
                                </div>}
                        </SimpleBar>

                    </div>
                </div>
            </OutsideClickHandler>
        </SelectStyled>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        actionOptions: ({attributes, formMethods, cb, url}) => {
            dispatch({
                type: ApiActions.OPERATION_ADD.REQUEST,
                payload: {
                    attributes,
                    formMethods,
                    cb,
                    url,
                    isChangeListState: false
                },
            });
        },
    }
}

export default connect(null, mapDispatchToProps)(memo(Select));
