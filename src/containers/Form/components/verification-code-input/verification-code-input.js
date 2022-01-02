import React, { useEffect } from 'react';
import ReactCodeInput from 'react-verification-code-input';
import styled from "styled-components";
import { get } from "lodash";
import Label from "../../../../components/elements/label";
import { ErrorMessage } from "@hookform/error-message";

const StyledVerificationInput = styled.div`
  .verification-input {
    & > div {
      display: flex;
      justify-content: space-between;
    }

    input {
      margin-right: 9px;
      width: 50px !important;
      height: 45px !important;
      border: 1px solid #E6E8EC !important;
      border-radius: 8px !important;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 18px;

      &:last-child {
        margin-right: 0 !important;
      }
    }
  }
`;

const VerificationInput = ({
    Controller,
    control,
    register,
    name,
    watch,
    getValues,
    errors,
    params,
    property,
    defaultValue,
    label,
    setError,
    ...rest
}) => {
    useEffect(() => {
        if (getValues(name)) {
            if (getValues(name).length < 6) {
                setError(name, { type: 'required', message: 'Error' });
            }
        }
    }, [watch(name)]);
    return (
        <StyledVerificationInput>
            <Label
                htmlFor={name}
            >
                {label}
            </Label>
            <div>
                <Controller
                    as={ReactCodeInput}
                    control={control}
                    name={name}
                    defaultValue={defaultValue}
                    rules={params}
                    render={({ field }) => <ReactCodeInput
                        {...field}
                        fields={get(property, 'fields', 6)}
                        className={'verification-input'}
                    />}
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
        </StyledVerificationInput>
    );
};

export default VerificationInput;
