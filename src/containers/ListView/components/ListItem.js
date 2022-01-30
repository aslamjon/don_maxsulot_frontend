import React, {useEffect, useState} from "react";
import styled,{css} from "styled-components";
import {Col, Row} from "react-grid-system";
import {connect} from "react-redux";
import {get, isEmpty} from "lodash";
import Button from "../../../components/elements/button";
import FormDemo from "../../Form/form-demo";
import Field from "../../Form/field";
import Actions from "../../../modules/settings/actions";
import {toast} from "react-toastify";
import ListBox from "./ListBox";
import Icon from "../../../components/elements/icon";

const StyledListItem = styled.div`
    background: ${({active}) => active ? '#353945' : '#f1f2f4'};
    border-radius: 10px;
    /* padding: 10px; */
    cursor: pointer !important;
    margin-bottom: 10px; 
    position: relative;
    overflow: hidden;
    height: 60px;
    form{
      position: relative;
      display: inline-block;
    }
  .form {
    .form-input-container {
      padding: 0;
      background: unset;
      border: none;
      height: 40px;
    }

    .form-input {
      color: ${({active}) => active ? '#fff' : '#353945'};
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      background-color: ${({disabled}) => disabled ? 'transparent' : '#FCFCFD'};
      border-radius: 6px;
      padding: 5px 14px;
      border: none;
      outline: none;
      cursor: pointer;
      text-transform: uppercase;
      height: 40px;
      &:hover {
        background-color: #E6E8EC;
        color: #353945;
        padding-left: 14px;
      }
    }

    &__btn {
      display: ${({disabled}) => disabled ? 'none' : 'block'};
      a, button {
        position: absolute;
        top: 15px;
        right: 18px;
        z-index: 9;
        width: 28px;
        height: 28px;
        border-radius: 5px;
        min-width: unset;
        background: #45B36B;
      }
    }
  }
  .iconContainer {
    position: absolute;
    top: 0px;
    right: -150px;
    height: 100%;
    display: flex;
    align-items: center;
    transition: 0.3s;
    .IconDots {
      padding-right: 40px;
      .ui__icon__wrapper {
        width: 23px;
        height: 38px;
        .icon {
          width: 23px;
          height: 38px;
          -webkit-mask-size: 70%;
          mask-size: 70%;
        }
      }
    }
    .bottomArrow{
      transform: translateX(150px);
      transition: 0.3s;
    }
  }

  
  ${({ active }) => active && css`
    .iconContainer {
        right: 0px;
    }
  `}
  ${({ active }) => !active && css`
    &:hover {
      background: #E6E8EC;
      color: #353945;
      .iconContainer {
        right: 0;
      }
      .form {
        .form-input {
          color: #353945;
          &:hover {
            color: #353945;
          }
        }
      }
    }
  `}
  &.md{
    height: 60px;
    &:hover {
      background: ${({active}) => active ? '#FCFCFD' : '#FCFCFD'};
      .form {
        .form-input {
          color: #353945;
        }
      }
    }
    background: ${({active}) => active ? '#F4F5F6' : '#F4F5F6'};

    .form{
      .form-input{
        color: ${({active}) => active ? '#353945' : '#353945'};
        font-size: 18px;
        padding: 10px 15px;
        line-height: 27px;
        padding: 9px 0 8px 16px;
      }
      &__btn{
        button{
          top: 14px;
          width: 32px;
          height: 32px;
          border-radius: 10px;
        }
      }
    }
    div.form {
      padding: 8px;
    }
    .iconContainer {
      padding-right: 24px;
      right: 0;
      .bottomArrow{
        transform: translateX(0px);
      }
      .IconDots {
        padding-right: 0;
        display: none;
      }
    }
    ${({active}) => active && css`
      .iconContainer {
        .bottomArrow{
          transform: rotate(180deg);
        }
      }
    `}
  }
  &.sm {
    height: 60px;
    margin: 0 -20px 10px;
    background: ${({active}) => active ? '#F4F5F6' : '#F4F5F6'};
    &:hover {
      background: #FCFCFD;
      .form {
        .form-input {
          color: #353945;
        }
      }
    }
    .form {
      .form-input {
        color: ${({active}) => active ? '#353945' : '#353945'};
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        padding: 8px 0 8px 14px;
      }
      &__btn {
        a, button {
          width: 30px;
          height: 30px;
          top: 15px;
        }
      }
    }
  }

  &.dragging {
    background-color: #45B36B;
    .form-input{
      color: #fff;
    }
    .iconContainer {
      right: 0px;
      .IconDots {
        display: inline-block;
      }
    }
    &.md {
      .iconContainer {
        padding-right: 24px;
      }
      .IconDots {
        padding-right: 16px;
      }
      .form-input{
          color: ${({active}) => active ? '#353945' : '#fff'};
      }
    }

    &.sm {
      .iconContainer {
        padding-right: 0px;
        .IconDots {
          padding-right: 20px;
        }
      }
      .form-input{
          color: ${({active}) => active ? '#353945' : '#fff'};
      }
    }
    ${({ disabled, active }) => active && !disabled && css`
      &.sm, &.md {
        .form-input {
          color: #353945 !important;
        }
      }
    `}
  }
  
  ${({ disabled, className }) => !disabled && className === 'md' && css`
    .from {
      &__btn {
        width: auto;
        height: auto;
      }
    }
  `}
  ${({ disabled, active }) => active && !disabled && css`
    .form {
      &-input {
        color: #353945 !important;
      }
    }
  `}
  div.form {
    padding: 10px;
  }
  label {
    display: none;
  }
  .h-100per {
    height: 100%;
  }
`;

const ListItem = ({item, updateModuleRequest,link='edit-module',changeOrder = () =>{},isDraggingOver = false, ...rest}) => {
    const [disabled, setDisabled] = useState(true);
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (disabled) {
            setActive(false)
        }
    }, [disabled])

    const update = ({data, setError}) => {
        setLoading(true);
        updateModuleRequest({
            attributes: {...data, id: get(item, 'id', null),link},
            formMethods: {setLoading, setError},
            cb: {
                success: ({message = 'SUCCESS'}) => {
                    setDisabled(true);
                    toast.success(message);
                },
            },
        })

    };

    return (
        <>
            <StyledListItem   disabled={disabled} active={active} {...rest} onClick={() => setActive(active => !active)}>
                <Row className="h-100per">
                    <Col xs={4}>
                        <div className="h-100per" onDoubleClick={() => setDisabled(disabled => !disabled)}>
                            <FormDemo mainClassName="" formRequest={update} className={'form'}
                                      footer={<Button type={'submit'} className={'form__btn'} success="1" check="1"
                                                      center="1" checkDisable="1"></Button>}>
                                <Field hideLabel={"ture"} type="input" name={'titleUz'} defaultValue={get(item, 'titleUz')}
                                       property={{disabled: disabled}}/>
                            </FormDemo>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div onDoubleClick={() => setDisabled(disabled => !disabled)}>
                            <FormDemo formRequest={update} className={'form'}
                                      footer={<Button type={'submit'} className={'form__btn'} success="1" check="1"
                                                      center="1" checkDisable="1"></Button>}>
                                <Field hideLabel={"ture"} type="input" name={'titleEn'} defaultValue={get(item, 'titleEn')}
                                       property={{disabled: disabled}}/>
                            </FormDemo>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div onDoubleClick={() => setDisabled(disabled => !disabled)}>
                            <FormDemo formRequest={update} className={'form'}
                                      footer={<Button type={'submit'} className={'form__btn'} success="1" check="1"
                                                      center="1" checkDisable="1"></Button>}>
                                <Field hideLabel={"ture"} type="input" name={'titleEn'} defaultValue={get(item, 'titleEn')}
                                       property={{disabled: disabled}}/>
                            </FormDemo>
                        </div>
                    </Col>
                </Row>
                <div className="iconContainer">
                  <Icon icon="icon-dots" mainClassName="IconDots" color="#FCFCFD" />
                  <Icon icon="icon-bottom-arrow" color="#323232" mainClassName="bottomArrow" />
                </div>
            </StyledListItem>

            {
                active && !isEmpty(get(item, 'departments', [])) && <ListBox active link={'edit-department'} isDraggingOver={isDraggingOver} changeOrder={changeOrder} itemSize={'md'} data={get(item, 'departments', [])}/>
            }
            {
                active && !isEmpty(get(item,'pages',[])) && <ListBox style={{marginTop: 0, padding: "0 20px"}} link={'edit-page'} data={get(item,'pages',[])} itemSize={'sm'} changeOrder={changeOrder} />
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateModuleRequest: ({attributes, formMethods, cb}) => dispatch({
            type: Actions.UPDATE_MODULE_OR_DEPARTMENT_OR_PAGE_TITLE.REQUEST,
            payload: {attributes, formMethods, cb}
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
