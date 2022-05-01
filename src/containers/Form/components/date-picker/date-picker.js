// import React, { useState, useEffect } from 'react';
// import RDatePicker from "react-datepicker";
// import styled from "styled-components";
// import { Col, Row } from "react-grid-system";
// import { get, head, last } from "lodash";
// import Label from "../../../../components/elements/label";
// import InputMask from "react-input-mask";
// import { DateRangePicker } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css';
// import { addDays } from 'date-fns';
// import Datesvg from "../../../../assets/icons/date.svg";
// import Datepicker from 'rsuite/DatePicker';
//
// const StyledDatepicker = styled.div`
//   .rs-picker-toggle-active{
//     border: 1px solid #45B36B !important;
//     box-shadow: none;
//     .rs-picker-toggle-placeholder{
//       opacity: 0.1 !important;
//     }
//     .rs-picker-toggle-value{
//       color: #777E90 !important;
//     }
//     .rs-picker-toggle-textbox::placeholder{
//       opacity: 0.1 !important;
//       font-size: 12px !important;
//     }
//   }
//   .rs-picker-toggle{
//     border-radius: 8px;
//     padding: 8px 50px 8px 12px !important;
//     svg{
//       display: none;
//     }
//     .rs-picker-toggle-value{
//       color: #777E90 !important;
//     }
//     .rs-picker-toggle-placeholder{
//       font-size: 12px !important;
//     }
//     :hover{
//       border: 1px solid #45B36B !important;
//     }
//     ::before{
//       content: '';
//       width: 24px;
//       height: 24px;
//       background: url(${Datesvg});
//       background-size: 100%;
//       background-position: center;
//       position: absolute;
//       right: 5px;
//       top: 7px;
//       z-index: 2;
//     }
//     ::after{
//       content: "";
//       position: absolute;
//       right: 30px;
//       top: 3px;
//       width: 1px;
//       height: 28px;
//       background-color: #E6E8EC;
//     }
//   }
// `;
// const DatePicker = ({
//   Controller,
//   register,
//   range,
//   name,
//   errors,
//   params,
//   label,
//   property,
//   setValue,
//   getValues,
//   defaultValue = new Date().getTime(),
//   control,
//   labelRequired,
//   cols = [12, 12],
//   className,
// <<<<<<< HEAD
//     mainClassName,
// =======
//                       beArray = false,
// >>>>>>> 0519edde73f9ee09c247ad24ee45fdaa444981c9
//   ...rest }) => {
//   // const [dates, setDates] = useState([]);
//   // const [date, setDate] = useState(defaultValue);
//
//   useEffect(() => {
//     if (getValues(name) == undefined) {
//       if (beArray) setValue(name, [defaultValue]);
//       else setValue(name, defaultValue);
//     }
//   },[])
//   const onOk = (value) => {
//     if (!range){
//       if (beArray) setValue(name, [new Date(value).getTime()]);
//       else setValue(name, new Date(value).getTime());
//     }
//     else {
//       if (beArray) setValue(name, [new Date(value).getTime()]);
//       else setValue(name, new Date(value).getTime());
//     }
//   };
//   return (
//     <StyledDatepicker className={mainClassName ? mainClassName : 'test'} {...rest}>
//       <Row>
//         {label && <Col xs={head(cols)}>
//           <Label htmlFor={name} className="form-label">
//             {label} {labelRequired && <span style={{ color: "red" }}>*</span>}
//           </Label>
//         </Col>}
//         <Col xs={last(cols)}>
//           <Controller
//             as={range ? DateRangePicker : Datepicker}
//             control={control}
//             name={name}
//             rules={params}
//             render={({ field }) => <>{range
//               ? <DateRangePicker
//                 value={getValues(name)}
//                 className={`dateRangePicker ${className}`}
//                 format={get(property, "format", "yyyy-MM-dd HH:mm")}
//                 character="/"
//                 placeholder={get(property, "placeholder", "yyyy - MM - dd HH : mm / yyyy - MM - dd HH : mm")}
//                 onOk={onOk}
//               />
//               : <Datepicker
//                 className={`datePicker ${className}`}
//                 format={get(property, "format", "yyyy-MM-dd HH:mm")}
//                 character="/"
//                 value={beArray ? head(getValues(name)) : getValues(name) }
//                 placeholder={get(property, "placeholder", "yyyy - MM - dd HH : mm")}
//                 onOk={onOk}
//                 defaultValue={defaultValue}
//
//               />}</>}
//           />
//         </Col>
//       </Row>
//     </StyledDatepicker>
//   );
// };
//
// export default DatePicker;
