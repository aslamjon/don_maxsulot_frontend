import React from 'react';
import styled from "styled-components";
import Checkbox2 from 'rc-checkbox';
import {ErrorMessage} from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";

const StyledSwitch = styled.div`
input{
    width: 40px;
    height: 21px;
}
    .rc-checkbox {
        height: 21px;
        width: 40px;
        &:hover {
            
        }
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
`;

const Switchcheck = ({
                    Controller,
                    control,
                    register,
                    name,
                    errors,
                    params,
                    property,
                    defaultValue,
                    label,
                    ...rest
            }) => {
    return (
        <StyledSwitch {...rest}>

            <Controller
                as={Checkbox2}
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={params}
                render={({field}) => <label htmlFor=""><Checkbox2
                    {...field}
                    onChange={() => {
                    }}
                /> {label}</label>}
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render={({messages = `${label} is required`}) => {
                    return <small className="form-error-message"><img src={errorImg} alt=""/> {messages}</small>;
                }}
                />

        </StyledSwitch>
    )
}

export default Switchcheck;
