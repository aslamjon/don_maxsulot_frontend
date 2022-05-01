import React, {memo, useEffect} from "react";
import {ErrorMessage} from "@hookform/error-message";
import {get, head, includes, isEmpty, last} from "lodash";
import {Col, Row} from "react-grid-system";
import styled from "styled-components";
import Label from "../../../../components/elements/label";
import errorImg from "../../../../assets/icons/error2.svg";
import Select from "../../../../components/elements/select/Select";

const Styled = styled.div``;

const CustomSelect = ({
                          register,
                          name = "",
                          errors,
                          params,
                          property,
                          defaultValue = "",
                          getValues,
                          watch,
                          hideLabel,
                          label,
                          setValue,
                          getValueFromField = () => {
                          },
                          colClassName = "",
                          rowClassName = "",
                          hideError = false,
                          cols = [12, 12],
                          labelRequired,
                          options = [],
                          className = "",
                          action,
                          placeholder = "",
                          onChange = () => "",
                          clearErrors,
                          ...rest
                      }) => {
    useEffect(() => {
        getValueFromField(getValues(name), name);
    }, [watch(name)]);

    const isError = () => ((name in errors) && isEmpty(getValues(name)) && get(params, "required", false));
    if (getValues(name) && get(errors, name)) clearErrors(name);

    return (
        <Styled className={className}>
            <Row className={rowClassName}>
                {!hideLabel && (
                    <Col xs={head(cols)}>
                        <Label htmlFor={name} className="form-label">
                            {label} {labelRequired && <span style={{color: "red"}}>*</span>}
                        </Label>
                    </Col>
                )}
                <Col className={colClassName} xs={last(cols)}>
                    <div className={`form-select-container`}>
                        <Select
                            {...register(name, params)}
                            className="form-select-container-select"
                            onChange={(data, value) => {
                                setValue(name, data);
                                onChange(data, value);
                            }}
                            ref={undefined}
                            value={getValues(name)}
                            {...{
                                ...rest,
                                action,
                                name,
                                defaultValue,
                                placeholder,
                                options,
                            }}
                        />
                    </div>
                    {!hideError && isError() && (
                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({messages = `${label} is required`}) => {
                                let isThereDot = includes(name, ".");
                                if (isThereDot) {
                                    if (get(errors, `${name}.type`) == "required") {
                                        messages = `${label} is required`;
                                    }
                                    if (get(errors, `${name}.type`) == "pattern") {
                                        messages = `${label} is not valid`;
                                    }
                                    if (get(errors, `${name}.type`) == "manual") {
                                        messages = `${label} ${errors[name].message}`;
                                    }
                                } else {
                                    if (errors[name].type == "required") {
                                        messages = `${label} is required`;
                                    }
                                    if (errors[name].type == "pattern") {
                                        messages = `${label} is not valid`;
                                    }
                                    if (errors[name].type == "manual") {
                                        messages = `${label} ${errors[name].message}`;
                                    }
                                }
                                return (
                                    <small className="form-error-message">
                                        <img src={errorImg} alt=""/> {messages}
                                    </small>
                                );
                            }}
                        />
                    )}
                </Col>
            </Row>
        </Styled>
    );
};

export default memo(CustomSelect);
