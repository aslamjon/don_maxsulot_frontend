import React from 'react';
import InputMask from "react-input-mask";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";
import { get } from "lodash";
import Label from "../../../../components/elements/label";

const StyledMaskedInput = styled.div`
    label {
        font-weight: 600;
        font-size: 15px;
        line-height: 12px;
        text-transform: uppercase;
        color: #777E91;
        margin-bottom: 14px;
    }
  .masked-input {
    padding: 12px;
    background: #FCFCFD;
    border: 1.5px solid #45B36B;
    box-sizing: border-box;
    border-radius: 10px;
    font-weight: 500;
    width: 100%;
    font-size: 20px;
    color: #353945;
    line-height: 30px;
    font-family: 'Poppins', sans-serif;
    outline: none;
    display: inline-block;

    &::placeholder {
      color: #B1B5C4;
    }
  }
`;
const MaskedInput = ({
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
        <StyledMaskedInput>
            <Label
                htmlFor={name}
            >
                {label}
            </Label>
            <div>
                <Controller
                    as={InputMask}
                    control={control}
                    name={name}
                    defaultValue={defaultValue}
                    rules={params}
                    render={({ field }) => <InputMask
                        {...field}
                        className={'masked-input'}
                        placeholder={get(property, 'placeholder')}
                        mask={get(property, 'mask', '\\+\\9\\9899-999-99-99')} alwaysShowMask={true} maskChar={'_'} />}
                />
            </div>
            <div>
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ messages = `${label} is required` }) => {
                        if (errors[name].type = 'required') {
                            messages = `${label} is required`;
                        } else if (errors[name].type = 'pattern') {
                            messages = `${label} is not valid`;
                        }
                        return <small className="form-error-message">{messages}</small>;
                    }}
                />
            </div>

        </StyledMaskedInput>

    );
};

export default MaskedInput;
