import React from 'react';
import {ButtonStyeld} from './buttonStyles';
import Icon from '../icon';
import plusImg from './../../../assets/icons/plus.svg';
import { isString } from 'lodash';

export default function Button({ children, type, edit, plus, link='', className='', onCLick=() => {}, ...props}) {
    return (
        <ButtonStyeld className={className} onClick={onCLick} {...{edit, plus, ...props}}>
            {isString(link) && link.length
                ? <a href={link} {...props} >{edit ? <Icon icon="icon-edit" color="white" /> : plus && <img src={plusImg} alt="plus" className="img-space-right" />} {children}</a> 
                : <button type={type ? type : "button"} {...props} >
                    {edit ? <Icon icon="icon-edit" color="white" /> : plus && <img src={plusImg} alt="plus" className="img-space-right" />} {children}
                </button>
            }
        </ButtonStyeld>
    )
}
