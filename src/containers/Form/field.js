import React from 'react';
import styled from "styled-components";
import {Input, MaskedInput} from "./components/input";
import FormConsumer from "../../context/form/FormConsumer";
import {AsyncSelect} from "./components/select";
import TextArea from "./components/textarea/textarea";
import {Checkbox, Switcher} from './components/checkbox';
import Radio from './components/radioInput';
import Search from './components/search/search';
import DropzoneComponent from './components/dropzone/Dropzone';
import ColorPicker from './components/colorPicker/colorPicker';
import CustomSelect from './components/select/customSelect';
import FormCustomDatePicker from './components/date-picker/form-custom-datepicker';
import VerificationCodeInput from "./components/verification-code-input/verification-code";
import CustomDatepicker from "./components/date-picker/custom-datepicker";
// import ClockPicker from "./components/clock-picker";
import File from "./components/input/file";
// import EmojiField from "./components/emoji/emojiField";
import TreeComponent from "./components/tree/Tree";

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
                        case 'custom-select':
                            return <FormConsumer>{({ attrs, getValueFromField }) => <CustomSelect {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>;
                        case 'async-select':
                            return <FormConsumer>{({ attrs }) => <AsyncSelect {...rest} {...attrs} />}</FormConsumer>;
                        case 'textarea':
                            return <FormConsumer>{({ attrs }) => <TextArea {...rest} {...attrs} />}</FormConsumer>;
                        case 'datepicker2':
                            return <FormConsumer>{({ attrs }) => <CustomDatepicker {...rest} {...attrs} />}</FormConsumer>;
                        case 'switch':
                            return <FormConsumer>{({ attrs, getValueFromField }) => <Switcher {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>;
                        case 'checkbox':
                            return <FormConsumer>{({ attrs, getValueFromField }) => <Checkbox {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>;
                        case 'radio':
                            return <FormConsumer>{({ attrs, getValueFromField }) => <Radio {...rest} {...attrs} getValueFromField={getValueFromField} />}</FormConsumer>;
                        case 'search':
                            return <FormConsumer>{({ attrs, getValueFromField }) => <Search getValueFromField={getValueFromField} {...rest} {...attrs} />}</FormConsumer>;
                        case 'search-select':
                            return <FormConsumer>{({ attrs }) => <Search {...rest} {...attrs} />}</FormConsumer>;
                        case 'dropzone':
                            return <FormConsumer>{({ attrs }) => <DropzoneComponent {...rest} {...attrs} />}</FormConsumer>;
                        case 'color':
                            return <FormConsumer>{({ attrs }) => <ColorPicker {...rest} {...attrs} />}</FormConsumer>;
                        case 'verification':
                            return <FormConsumer>{({ attrs }) => <VerificationCodeInput {...rest} {...attrs} />}</FormConsumer>;
                        case 'new-datepicker':
                            return <FormConsumer>{({ attrs }) => <FormCustomDatePicker {...rest} {...attrs} />}</FormConsumer>;
                        case 'custom-datepicker':
                            return <FormConsumer>{({ attrs }) => <CustomDatepicker {...rest} {...attrs} />}</FormConsumer>;
                        // case 'clock':
                        //     return <FormConsumer>{({ attrs }) => <ClockPicker {...rest} {...attrs} />}</FormConsumer>;
                        case 'file':
                            return <FormConsumer>{({ attrs }) => <File {...rest} {...attrs} />}</FormConsumer>;
                        case 'tree':
                            return <FormConsumer>{({ attrs }) => <TreeComponent {...rest} {...attrs} />}</FormConsumer>;
                        default:
                            return <FormConsumer>{({ attrs }) => <Input {...rest} {...attrs} />}</FormConsumer>;
                    }

                })(type)
            }
        </>
    )
}

export default Field;
