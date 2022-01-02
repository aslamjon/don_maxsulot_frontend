import React from 'react';
import styled from "styled-components";
import checkbox from 'rc-checkbox';

const StyledCheckbox = styled.div`

`;
const Checkbox = ({
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
        <StyledCheckbox {...rest}>

            <Controller
                as={checkbox}
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={params}
                render={({field}) => <label htmlFor=""><checkbox
                    checked
                    onChange={() => {
                    }}
                /> checkbox</label>}
            />




        </StyledCheckbox>
    );
};

export default Checkbox;
