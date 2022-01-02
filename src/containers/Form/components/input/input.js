import React, { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { get, head, last } from "lodash";
import { Col, Row } from "react-grid-system";
import Label from "../../../../components/elements/label";
import styled from "styled-components";
import Icon from "../../../../components/elements/icon";

const StyledInput = styled.div`
    .from-input-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 15px;
        background: #FCFCFD;
        border: 1px solid #E6E8EC;
        box-sizing: border-box;
        border-radius: 10px;
        .form-input {
            background: none;
            font-size: 14px;
            width: 100%;
            outline: none;
            border: none;
            font-family: 'Poppins', sans-serif;
            &::placeholder{
            color:#B1B5C4;
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
    label,
    cols = [12, 12],
    ...rest
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <StyledInput {...rest}>
            <Row>
                <Col xs={head(cols)}>
                    <Label htmlFor={name}>
                        {label}
                    </Label>
                </Col>
                <Col xs={last(cols)}>
                    <div className="from-input-container">
                        <input
                            className="form-input"
                            name={name}
                            {...register(name, params)}
                            readOnly={get(property, "disabled")}
                            placeholder={get(property, "placeholder")}
                            type={isOpen ? 'text' : get(property, 'type', 'text')}
                            defaultValue={defaultValue}
                        />
                        {get(property, 'type') === 'password' && <div className="eye" onClick={() => setIsOpen(state => !state)}><Icon icon="icon-eye" /></div>}
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({ messages = `${label} is required` }) => {
                            if (errors[name].type = 'required') {
                                messages = `${label} is required`;
                            }
                            if (errors[name].type = 'pattern') {
                                messages = `${label} is not valid`;
                            }
                            if (errors[name].type = 'manual') {
                                messages = `${label} ${errors[name].message}`;
                            }
                            return <small className="form-error-message">{messages}</small>;
                        }}
                    />
                </Col>
            </Row>
        </StyledInput>
    );
};

export default Input;
