import React, {useEffect, useRef} from 'react'
import styled, {css} from 'styled-components';
import {includes} from "lodash";

const ModalStyled = styled.div`
  ${({className}) => includes(className, "modal") && css`
    width: 0vw;
    height: 0vh;
    background: rgba(53, 57, 69, 0.2);
    z-index: -1000;
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 20ms;
    border-radius: 50%;
    //transform: translateY(120vh); 
    .modal {
      &__body {
        min-width: 50px;
        background: #FFFFFF;
        border: 1px solid #E6E8EC;
        box-sizing: border-box;
        box-shadow: 0px 40px 32px rgba(15, 15, 15, 0.12);
        border-radius: 8px;
        padding: 15px;
        transition: 0.3s;
        transform: scale(0);
        min-height: 15vh;
      }
    }

    ${({width}) => width && css`
      .modal {
        &__body {
          width: ${width}px;
        }
      }
    `}
    ${({active}) => active && css`
      width: 100%;
      height: 100%;
      top: 0%;
      left: 0%;
      border-radius: 0%;
      transition: 0.2s;
      /* transform: translateY(0); */

      .modal {
        &__body {
          transform: scale(1);
        }
      }

      z-index: 1000;
    `}
  `}
`;

export default function Modal({
                                  children,
                                  className = '',
                                  classNames = [],
                                  active = false,
                                  onClose = () => {},
                                  header,
                                  ...props
                              }) {
    let ref = useRef(null);

    function eventFunc(e) {
        if (ref.current === e.target) if (active) onClose();
        if (!active) e.stopPropagation();
    }

    useEffect(() => {
        active && document.addEventListener('click', eventFunc);
        return () => document.removeEventListener('click', eventFunc);
    }, [active]);
    return (
        <ModalStyled
            {...{
                className: `modal ${className}`,
                active,
                ref,
                ...props
            }} >
            {header && <div className="modal__header">
                {header}
            </div>}
            <div className="modal__body">
                {children}
            </div>
        </ModalStyled>
    )
}
