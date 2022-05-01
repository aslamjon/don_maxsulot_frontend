import React, { useState } from 'react';
import Select from '../../../components/elements/select/Select';
import Field from '../../../containers/Form/field';
import LeadsPage from '../../leads/pages/LeadsPage';
import FormDemo from './../../../containers/Form/form-demo';
import Sort from './../../../components/elements/sort/sort';

const MyComponent = () => {
    const [selectValue, setSelect] = useState("");
    return (
        <div style={{width: "250px"}}>
            {/*<FormDemo>*/}
            {/*    <Field type="custom-select" name="select" options={[*/}
            {/*    { value: "key 1", label: "Test 1", color: "#9757D7" },*/}
            {/*    { value: "key 2", label: "Test 2", color: "#45B36B" },*/}
            {/*    { value: "key 3", label: "Test 3", color: "#EF466F" },*/}
            {/*    { value: "key 4", label: "hello 3", color: "#EF466F" },*/}
            {/*    { value: "key 5", label: "world 3", color: "#45B36B" },*/}
            {/*    { value: "key 6", label: "Uzbekistan 3", color: "#45B36B" },*/}
            {/*    { value: "key 7", label: "Dell 3", color: "#9757D7" },*/}
            {/*]} */}
            {/*isSearchable*/}
            {/*isMulti*/}
            {/*/>*/}
            {/*</FormDemo>*/}
            <Select options={[
                { value: "key 1", label: "Test 1", color: "#9757D7" },
                { value: "key 2", label: "Test 2", color: "#45B36B" },
                { value: "key 3", label: "Test 3", color: "#EF466F" },
                { value: "key 4", label: "hello 3", color: "#EF466F" },
                { value: "key 5", label: "world 3", color: "#45B36B" },
                { value: "key 6", label: "Uzbekistan 3", color: "#45B36B" },
                { value: "key 7", label: "Dell 3", color: "#9757D7" },
            ]}/>
            {/*<Sort />*/}
            {/*<LeadsPage />*/}
        </div>
    );
};

export default MyComponent;
