import React, {useEffect, useState} from "react";
import {ErrorMessage} from "@hookform/error-message";
import {get, head, last} from "lodash";
import {Col, Row} from "react-grid-system";
import Label from "../../../../components/elements/label";
import styled from "styled-components";
import errorImg from "../../../../assets/icons/error2.svg";
import eye2Img from "../../../../assets/icons/eye2.svg";

const StyledInput = styled.div`
  .form-input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FCFCFD;
    border: 1px solid #E6E8EC;
    box-sizing: border-box;
    border-radius: 10px;
    .form-input {
        padding: 12px 12px;
        background: none;
        font-size: 18px;
        width: 100%;
        outline: none;
        border: none;
        font-family: 'Poppins', sans-serif;
        &::placeholder{
        color:#B1B5C4;
        }
        appearance: none !important;
        -moz-appearance: none !important;
        -webkit-appearance: none !important;
        &:autofill, &:-internal-autofill-selected, &:webkit-autofill {
            background: none !important;
            &:active, &:hover, &:focus {
                background: none !important;
            }
        }
    }
    .eye {
        width: 30px;
        height: 30px;
        background: rgba(244,245,246,1);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: 0.2s;
        cursor: pointer;
        &:hover {
            background: rgba(240,240,240,1);
        }
    }
}
`;
const Input = ({
                   register,
                   name,
                   errors,
                   params,
                   property,
                   defaultValue,
                   getValues,
                   watch,
                   hideLabel,
                   label,
                   setValue,
                   getValueFromField = () => {},
                   colClassName='',
                   rowClassName='',
                   hideError=false,
                   cols = [12, 12],
                   labelRequired,
                   maxLength=524288,
                   ...rest
               }) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        getValueFromField(getValues(name),name)
    }, [watch(name)]);

    return (
        <StyledInput {...rest}>
            <Row className={rowClassName}>
                {!hideLabel && <Col xs={head(cols)}>
                    <Label htmlFor={name} className="form-label">
                        {label} {labelRequired && <span style={{color: "red"}}>*</span>}
                    </Label>
                </Col>}
                <Col className={colClassName} xs={last(cols)}>
                    <div className="form-input-container">
                            <input
                                className="form-input"
                                name={name}
                                {...register(name, params)}
                                readOnly={get(property, "disabled")}
                                placeholder={get(property, "placeholder")}
                                type={isOpen ? 'text' : get(property, 'type', 'text')}
                                defaultValue={defaultValue}
                                autocomplete="off"
                                maxLength={maxLength}
                            />
                            {get(property, 'type') === 'password' &&
                            <div className="eye" onClick={() => setIsOpen(state => !state)}>
                                {/* <Icon icon="icon-eye2"/> */}
                                <img src={eye2Img} alt="eye2" />
                            </div>}
                        </div>
                        {!hideError && 
                            <ErrorMessage
                                errors={errors}
                                name={name}
                                render={({messages = `${label} is required`}) => {
                                    if (errors[name].type = 'required') {
                                        messages = `${label} is required`;
                                    }
                                    if (errors[name].type = 'pattern') {
                                        messages = `${label} is not valid`;
                                    }
                                    if (errors[name].type = 'manual') {
                                        messages = `${label} ${errors[name].message}`;
                                    }
                                    return <small className="form-error-message"><img src={errorImg} alt=""/> {messages}</small>;
                                }}
                            />}
                    </Col>
                </Row>
        </StyledInput>
    );
};

export default Input;
