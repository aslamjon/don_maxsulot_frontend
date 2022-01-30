import React, {useEffect, useState} from 'react';
import styled, { css } from "styled-components";
import Checkbox2 from 'rc-checkbox';
import {ErrorMessage} from "@hookform/error-message";
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
                    top: 4px;
                    left: 6.5px;
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
                      label,
                      setValue,
                      inBtn,
                      getValues,
                      watch=() => {},
                      getValueFromField = () => {
                      },
                      ...rest
                  }) => {
    const [checked, setChecked] = useState(defaultValue);
    useEffect(() => {
        getValueFromField(getValues(name), name)
    }, [watch(name)]);
    return (
        <StyledCheckbox {...rest}>
            <Controller
                as={Checkbox2}
                control={control}
                name={name}
                rules={params}
                render={({field}) => <label htmlFor="#checkbox">
                    {inBtn
                        ? <Button lightButton className="checkbox-with-button" onCLick={() => {
                            setValue(name, checked);
                            setChecked(state => !state)
                        }}>
                            <Checkbox2 id={'checkbox'}
                                       {...field}
                                       defaultChecked={defaultValue}
                                       checked={checked}
                                       onChange={(e) => {
                                           setValue(name, e.target.checked);
                                           setChecked(state => !state);
                                       }}
                            /> {label}
                        </Button>
                        : <>
                            <Checkbox2 id={'checkbox'}
                                {...field}
                                defaultChecked={defaultValue}
                                checked={checked}
                                onChange={(e) => {
                                    setValue(name,e.target.checked);
                                    setChecked(state => !state);
                                }}
                            /> {label}
                        </> }
                </label> }
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render={({messages = `${label} is required`}) => {
                    return <small className="form-error-message"><img src={errorImg} alt=""/> {messages}</small>;
                }}
                />

        </StyledCheckbox>
    );
};

export default Checkbox;
