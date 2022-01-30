import React from 'react';
import styled from "styled-components";
import { Input, MaskedInput } from "./components/input";
import FormConsumer from "../../context/form/FormConsumer";
import { AsyncSelect, Select } from "./components/select";
import TextArea from "./components/textarea/textarea";
import { Checkbox, Switchcheck } from './components/checkbox';
import Radio from './components/radioInput';
import Search from './components/search/search';
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const StyledField = styled.div`
  margin-bottom: 30px;
`;
const Field = ({ type, ...rest }) => {
    return (
        <>

            {
                ((type) => {
                    switch (type) {
                        case 'input':
                            return <FormConsumer>{({ attrs, getValueFromField }) => <Input {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>;
                        case 'input-mask':
                            return <FormConsumer>{({ attrs, getValueFromField }) => <MaskedInput {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>;
                        case 'select':
                            return <FormConsumer>{({ attrs, getValueFromField }) => <Select {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>;
                        case 'async-select':
                            return <FormConsumer>{({ attrs }) => <AsyncSelect {...rest} {...attrs} />}</FormConsumer>;
                        case 'textarea':
                            return <FormConsumer>{({ attrs }) => <TextArea {...rest} {...attrs} />}</FormConsumer>;
                        case 'switch':
                            return <FormConsumer>{({ attrs }) => <Switchcheck {...rest} {...attrs} />}</FormConsumer>;
                        case 'checkbox':
                            return <FormConsumer>{({ attrs, getValueFromField }) => <Checkbox {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>;
                        case 'radio':
                            return <FormConsumer>{({ attrs,getValueFromField }) => <Radio {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>;
                        case 'search':
                            return <FormConsumer>{({ attrs }) => <Search {...rest} {...attrs} />}</FormConsumer>;
                        case 'search-select':
                            return <FormConsumer>{({ attrs }) => <Search {...rest} {...attrs} />}</FormConsumer>;
                        default:
                            return <FormConsumer>{({ attrs }) => <SelectPicker {...rest} {...attrs} />}</FormConsumer>;
                    }

                })(type)
            }


        </>
    )
}

export default Field;
