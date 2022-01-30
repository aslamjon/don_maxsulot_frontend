import React from "react";
import {ErrorMessage} from "@hookform/error-message";
import styled from "styled-components";
import {Col, Row} from "react-grid-system";
import {head, last} from "lodash";
import Label from "../../../../components/elements/label";

const StyledTextarea = styled.div`
.form-textarea{
  border: 1.5px solid #E6E8EC;
  background: #FCFCFD;
  box-sizing: border-box;
  border-radius: 10px;
  width: 100%;
  padding: 15px;
  outline: none;
  font-size: 20px;
  color: #353945;
  line-height: 30px;
  font-family: 'Poppins',sans-serif;
  min-height: 200px;
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
                      label,
                      hideError=false,
                      cols = [12, 12],
                      ...rest
                  }) => {
    return (
        <StyledTextarea {...rest}>
            <Row>
                {!hideLabel && <Col xs={head(cols)}>
                    <Label className="form-textarea-label"
                        htmlFor={name}
                    >
                        {label}
                    </Label>
                </Col>}
                <Col xs={last(cols)}>
            <textarea
                {...register(name, params)}
                {...property}
                defaultValue={defaultValue}
                className={'form-textarea'}
            />
                {!hideError &&
                    <ErrorMessage
                        errors={errors}
                        name={name}
                        render={({messages = `${name} is required`}) => {
                            return <small className="form-control-feedback">{messages}</small>;
                        }}
                    /> }
                </Col>
            </Row>
        </StyledTextarea>
    );
};

export default TextArea;
