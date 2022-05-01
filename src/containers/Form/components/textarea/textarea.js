import React, { useRef, useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import styled from "styled-components";
import { Col, Row } from "react-grid-system";
import {get, head, last} from "lodash";
import Label from "../../../../components/elements/label";

const StyledTextarea = styled.div`
  .form-textarea {
    border: 1.5px solid #e6e8ec;
    background: #fcfcfd;
    box-sizing: border-box;
    border-radius: 10px;
    width: 100%;
    padding: 15px;
    outline: none;
    font-size: 20px;
    color: #353945;
    line-height: 30px;
    font-family: "Poppins", sans-serif;
    min-height: 200px;
    &::placeholder {
      color: #B1B5C4;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background-color: rgba(30, 30, 30, .5);
    }
  }
`;
const TextArea = ({
    register,
    name,
    params,
    errors,
    property,
    defaultValue,
    hideLabel,
    getValues,
    setValue,
    resposive,
    label,
    hideError = false,
    cols = [12, 12],
    disabled,
    placeholder = "Type here...",
    clearErrors,
    ...rest
}) => {

    useEffect(() => {
        if (getValues(name) === '' || getValues(name) !== defaultValue) setValue(name, defaultValue);
    }, [defaultValue]);
    const textAr = useRef()
    const setHeight = (e) => {
        if (resposive) {
            textAr.current.style.height = `${e.target.scrollHeight}px`
        }
    }
    let temp = {};
    if (resposive) temp.ref = resposive ? textAr : null;

    if (getValues(name) && get(errors, name)) clearErrors(name);

    return (
        <StyledTextarea {...rest}>
            <Row>
                {!hideLabel && (
                    <Col xs={head(cols)}>
                        <Label className="form-textarea-label" htmlFor={name}>
                            {label}
                        </Label>
                    </Col>
                )}
                <Col xs={last(cols)}>
                    <textarea
                        {...register(name, params)}
                        {...property}
                        onChange={setHeight}
                        {...{
                            className: "form-textarea",
                            defaultValue,
                            disabled,
                            placeholder,
                            ...temp
                        }}
                    />
                    {!hideError && (
                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({ messages = `${name} is required` }) => {
                                return (
                                    <small className="form-control-feedback">{messages}</small>
                                );
                            }}
                        />
                    )}
                </Col>
            </Row>
        </StyledTextarea>
    );
};

export default TextArea;
