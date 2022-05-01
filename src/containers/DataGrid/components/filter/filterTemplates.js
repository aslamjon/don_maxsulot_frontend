import React from 'react';
import styled from 'styled-components';
import Button from "../../../../components/elements/button";
import FormDemo from "../../../Form/form-demo";
import Input from "../../../../components/elements/input";
const StyledTemplates = styled.div`
    background-color: #fff;
    border-radius: 12px;
    max-width: 280px;
    bottom: -387px;
    position: absolute;
    right: 0;
    transition: 0.1s;
    .template__body{
        border: 1px solid #E6E8EC;
        box-shadow: 0px 40px 32px -24px rgba(15, 15, 15, 0.12);
        border-radius: 8px;
        .template__search{
            padding: 20px;
        }
        .inputContainer{
            background-color: #F4F5F6 !important;
            width: 100%;
        }
        button{
            width: 100%;
            background-color: #45B36B;
            border-radius: 8px;
            color: #fff;
            margin: 10px 0;
        }
       .title{
        margin-top: 15px;
        display: block;
        font-size: 14px;
        color: #777E91;
        font-weight: 600;
       } 
       .my-filter{
           border-top: 1px solid #ccc;
           padding: 0 20px;
       }
       .workspace-filter{
           margin-top: 15px;
           border-top: 1px solid #ccc;
           padding: 0 20px 10px;
       }
       .my-filter-list{
           .my-filter-item{
            font-size: 14px;
            font-weight: 500;
            color: #353945;
            padding: 6px 0px;

           }
       }
       .workspace-filter-list{
           .workspace-filter-item{
            font-size: 14px;
            font-weight: 500;
            color: #353945;
            padding: 6px 0px;

           }
       }
    }
`;
const FilterTemplates = () => {
    return (
        <StyledTemplates >
            <FormDemo>
                <div className='template__body'>
                    <div className='template__search'>
                        <Input placeholder={'Search...'} />
                    </div>
                    <div className='my-filter'>
                        <span className='title'>My Filter</span>
                        <Button>Save active filters</Button>
                        <div className='my-filter-list'>
                            <div className='my-filter-item'>For User</div>
                            <div className='my-filter-item'>For Students</div>
                        </div>
                    </div>
                    <div className='workspace-filter'>
                        <span className='title'>WORKSPACE FILTERS</span>
                        <Button>Save active filters</Button>
                        <div className='workspace-filter-list'>
                            <div className='workspace-filter-item'>Default</div>
                        </div>
                    </div>
                </div>
            </FormDemo>
        </StyledTemplates>
    );
};

export default FilterTemplates;