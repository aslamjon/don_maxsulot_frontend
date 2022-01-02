import styled, { css } from "styled-components";

export const ButtonStyeld = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #353945;
  text-align: center;
  text-transform: capitalize;
  background: #f4f5f6;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  /* min-width: 145px; */
  min-width: 215px;
  transition: 0.3s ease;
  position: relative;
  &:hover {
    background: #31a659;
    /* color: #fff; */
  }

  button,
  a {
    background: none;
    border: none;
    outline: none;
    width: inherit;
    height: inherit;
    color: inherit;
    padding: inherit;
    cursor: inherit;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
  }
  .img-space-right {
    margin-right: 7px;
  }

  ${({ success }) =>
    success &&
    css`
      background-color: #45b36b;
      color: #fff;
    `}

  ${({ outline_success }) =>
    outline_success &&
    css`
      background: rgba(69, 179, 107, 0.1);
      border: 1px solid #45b36b;
      font-size: 18px;
      line-height: 27px;
      color: #01ac56;
      &:hover {
        background: rgba(69, 179, 107, 0.3);
      }
    `}

    ${({ edit, plus }) =>
    (edit || plus) &&
    css`
      display: flex;
      align-items: center;
    `}
    /* ${({ plus, success }) =>
    (plus || success) &&
    css`
      background-color: rgba(69, 179, 107, 0.07);
      color: #45b36b;
      text-transform: uppercase;
      &:hover {
        background: rgba(69, 179, 107, 0.1);
      }
    `} */
    ${({ outlinedanger }) =>
    outlinedanger &&
    css`
      background: rgba(239, 70, 111, 0.1);
      color: #ef466f;
      &:hover {
        background: rgba(239, 70, 111, 0.2);
      }
    `}
    ${({ danger }) =>
    danger &&
    css`
      background: rgba(239, 70, 111, 1);
      color: #fcfcfd;
      &:hover {
        background: rgba(239, 70, 111, 0.9);
      }
    `}
    ${({ disabled }) =>
    disabled &&
    css`
      color: #b1b5c4;
      font-size: 16px;
      line-height: 24px;
      background: #fcfcfd;
      border: 1px solid #f4f5f6;
      cursor: default;
      &:hover {
        background: #fcfcfd;
      }
    `}
    ${({ lightbutton }) =>
    lightbutton &&
    css`
      background: rgba(252, 252, 253, 1);
      border: 1px solid #f4f5f6;
      color: #353945;
      font-size: 16px;
      line-height: 24px;
      transition: 0.2s;
      &:hover {
        background: rgba(245, 245, 245, 1);
      }
    `}
    ${({ lightsmborder }) =>
    lightsmborder &&
    css`
      border: 0.5px solid #e6e8ec;
    `}
    ${({ theme: { mode }, outlinedanger }) =>
    mode === "dark" &&
    outlinedanger &&
    css`
      background: rgba(239, 70, 111, 0.2);
      &:hover {
        background: rgba(239, 70, 111, 0.3);
      }
    `}
    ${({ bg }) =>
    bg &&
    css`
      background: ${bg};
    `}
    ${({ hover }) =>
    hover &&
    css`
      :hover {
        background: ${hover};
      }
    `}
    ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
    ${({ xs }) =>
    xs &&
    css`
      font-size: 12px;
    `}
    ${({ sm }) =>
    sm &&
    css`
      font-size: 14px;
    `}
    ${({ regular }) =>
    regular &&
    css`
      font-size: 16px;
    `}
    ${({ md }) =>
    md &&
    css`
      font-size: 18px;
    `}
    ${({ lg }) =>
    lg &&
    css`
      font-size: 24px;
    `}
    ${({ xl }) =>
    xl &&
    css`
      font-size: 36px;
    `}
    ${({ xxl }) =>
    xxl &&
    css`
      font-size: 48px;
    `}
    ${({ light }) =>
    light &&
    css`
      color: #fff;
    `}
    ${({ thin }) =>
    thin &&
    css`
      font-weight: 100;
    `}
    ${({ medium }) =>
    medium &&
    css`
      font-weight: 500;
    `}
    ${({ semibold }) =>
    semibold &&
    css`
      font-weight: 600;
    `}
    ${({ bold }) =>
    bold &&
    css`
      font-weight: 700;
    `}
    ${({ extrabold }) =>
    extrabold &&
    css`
      font-weight: 900;
    `}
    ${({ flex }) =>
    flex &&
    css`
      display: flex;
      justify-content: ${({ justify }) => justify || "flex-start"};
      align-items: ${({ align }) => align || "flex-start"};
    `}
    ${({ center }) =>
    center &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      .left-in-button {
        position: absolute;
        left: 16px;
      }
    `}
    ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}
    ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
    ${({ paddingtop }) =>
    paddingtop &&
    css`
      padding-top: ${paddingtop}px;
    `}
    ${({ paddingbottom }) =>
    paddingbottom &&
    css`
      padding-bottom: ${paddingbottom}px;
    `}
`;
