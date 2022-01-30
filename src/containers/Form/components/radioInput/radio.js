import React, {useEffect} from 'react';
import styled from "styled-components";
import {ErrorMessage} from "@hookform/error-message";
import errorImg from "../../../../assets/icons/error2.svg";

const StyledRadio = styled.div`
    input[type='radio'] {
        height: 0;
        position: relative;
        &:after, &:before {
            content: '';
            position: absolute;
            border-radius: 15px;
            display: inline-block;
            visibility: visible;
            background-color: none;
            cursor: pointer;
        }
        &:after {
            width: 16px;
            height: 16px;
            top: -7px;
            left: -3px;
            background-color: transparent;
            border: 1px solid #353945;
        }
        &:before {
            width: 12px;
            height: 12px;
            top: -5px;
            left: -1px;
            border: 2px solid white;
            z-index: 2;
        }
        &:checked {
            &:after {
                background-color: rgba(69,178,107,1);
                border: 1px solid rgba(69,178,107,1);
            }
            &:before {
                background-color: rgba(69,178,107,1);
                z-index: 2;
            }
        }
    }
`;
const Radio = ({
                   register,
                   name,
                   errors,
                   params,
                   property,
                   defaultValue,
                   label = "",
                   hideLabel,
                   getValues,
                   getValueFromField = () => {
                   },
                   watch,
                   ...rest
               }) => {
    useEffect(() => {
        getValueFromField(getValues(name), name)
    }, [watch(name)]);
    return (
        <StyledRadio {...rest}>

            {hideLabel ?
                <input type="radio"
                       name={name}
                       className="form-input-radio"
                       checked={defaultValue}
                       {...register(name, params)}
                />
                : <label htmlFor="">
                    <input type="radio"
                           name={name}
                           checked={defaultValue}
                           className="form-input-radio"
                                {...register(name, params)}
                                /> {label}</label>}

            <ErrorMessage
                errors={errors}
                name={name}
                render={({messages = `${label} is required`}) => {
                    return <small className="form-error-message"><img src={errorImg} alt=""/> {messages}</small>;
                }}
                />
        </StyledRadio>
    );
};

export default Radio;
