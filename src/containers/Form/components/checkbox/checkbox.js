import React, { useEffect, useState, memo } from 'react';
import styled, { css } from "styled-components";
import Checkbox2 from 'rc-checkbox';
import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";
import Button from '../../../../components/elements/button';

const StyledCheckbox = styled.div`
    .rc-checkbox {
        height: 15px;
        &:hover {
            .rc-checkbox-inner {
                border: 1px solid #777E91;
                &:hover {
                    border: 1px solid #777E91;
                }
            }
        }
        .rc-checkbox-inner {
            width: 15px;
            height: 15px;
            background: none;
            border: 1px solid #777E91;
            transition: 0.2s;
            &:hover {
                border: 1px solid #777E91;
            }
            &:after {
                top: 3px;
                left: 5px;
                width: 5px;
                height: 8px;
                opacity: 0;
                transition: 0.3s;
            }
            ${({ sm }) => sm && css`
                width: 14px;
                height: 14px;
                &:after {
                    top: 3px;
                    left: 5px;
                    width: 4px;
                }
            `}
            
            ${({ md }) => md && css`
                width: 18px;
                height: 18px;
                &:after {
                    top: 3px;
                    left: 6.2px;
                    width: 5px;
                    height: 10px;
                }
            `}
        }
        &.rc-checkbox-checked {
            .rc-checkbox-inner {
                border: none;
                background: #45B36B;
                &:after {
                    opacity: 1;
                }
                &:hover {
                    border: none;
                }
            }
        }
    }
    .checkbox-with-button {
        button {
            &:hover {
                color: #353945;
            }
        }
    }
    .disabled{
        .checkbox-with-button{
            button{
                color: #B1B5C3;
            }
        }
    }
    ${({ switchBtn }) => switchBtn && css`
    input{
      width: 40px;
      height: 21px;
    }
    .rc-checkbox {
        height: 21px;
        width: 40px;
        .rc-checkbox-inner {
            box-sizing: border-box;
            width: 40px;
            height: 21px;
            border: 1.6px solid #B1B5C4;
            border-radius: 32px;
            transition: 0.2s;
            &:after {
                transform: rotate(0deg);
                top: 8%;
                left: 2px;
                bottom: 2px;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: none;
                transition: 0.5s;
                background-color: #B1B5C3;
            }
        }
        &.rc-checkbox-checked {
            .rc-checkbox-inner {
                border: 1.6px solid #45B26B;
                background: #45B26B;
                &:after {
                    right: 2px;
                    left: 20px;
                    background-color: #FCFCFD;
                }
            }
        }
      }
    `}
  
  ${({ disabled }) => disabled && css`
    
  `}

  label{
    white-space: nowrap;
  }
`;
const Checkbox = ({
    Controller,
    control,
    register,
    name,
    errors,
    params,
    property,
    defaultValue = false,
    leftLabel = false,
    //   switch_btn = false,
    label,
    setValue,
    inBtn,
    getValues,
    watch = () => { },
    onChange = () => { },
    getValueFromField = () => { },
    disabled = false,
    className = '',
    ...rest
}) => {
    // const [checked, setChecked] = useState(defaultValue);
    useEffect(() => {
        getValueFromField(getValues(name), name);
        // if (getValues(name) == undefined) setValue(name, defaultValue);
    }, [watch(name)]);

    useEffect(() => {
        if (getValues(name) !== defaultValue) {

        setValue(name, defaultValue);
        // setChecked(defaultValue);
        onChange(defaultValue);
    }
    },[defaultValue]);


    return (
        <StyledCheckbox {...rest} className={classNames("form-checkbox-controler", { [className]: className, disabled: disabled })}>
            <Controller
                as={Checkbox2}
                control={control}
                name={name}
                rules={params}
                render={({ field }) => <label htmlFor="#checkbox" onClick={() => {
                    if (!disabled) {
                        let check = !getValues(name);
                        setValue(name, check);
                        onChange(check);
                    }
                }}>
                    {inBtn
                        ? <Button lightButton className="checkbox-with-button" hideClickAnimation={disabled} onCLick={() => {
                            // if (!disabled) {
                            //     let check = !getValues(name);
                            //     setValue(name, check);
                            //     onChange(check);
                            // }
                        }}>
                            {leftLabel && label}
                            <Checkbox2 id={'checkbox'}
                                {...field}
                                defaultChecked={defaultValue}
                                checked={getValues(name)}
                                disabled={disabled}
                            // onChange={(e) => {
                            //     if (!disabled) {
                            //         onChange(!checked);
                            //         setValue(name, e.target.checked);
                            //     }
                            // }}
                            /> {!leftLabel && label}
                        </Button>
                        : <>
                            <Checkbox2 id={'checkbox'}
                                {...field}
                                defaultChecked={defaultValue}
                                checked={getValues(name)}
                                disabled={disabled}
                                onChange={(e) => {
                                    if (!disabled) {
                                        // setValue(name, e.target.checked);
                                        // // setChecked(state => !state);
                                        // onChange(e.target.checked);
                                    }
                                }}
                            /> {label}
                        </>}
                </label>}
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ messages = `${label} is required` }) => {
                    return <small className="form-error-message"><img src={errorImg} alt="" /> {messages}</small>;
                }}
            />

        </StyledCheckbox>
    );
};

export default memo(Checkbox);
