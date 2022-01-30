import React from 'react';
import { createGlobalStyle } from "styled-components";
// import 'react-tabs/style/react-tabs.css';
import '../assets/css/style.scss';
import 'rc-checkbox/assets/index.css';
import 'antd/dist/antd.css';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, p, ul {
    margin: 0;
    padding: 0;
  }

  body {
    font-weight: 400;
    font-size: 16px;
    color: #353945;
    background: #F7F7FA;
    line-height: 1.5;
    font-family: 'Poppins', sans-serif;
  }
  
  .text {
    &-center {
      text-align: center !important;
    }

    &-right {
      text-align: right !important;
    }

    &-left {
      text-align: left !important;
    }
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .d-none {
    display: none;
  }
  .d-inline-block {
    display: inline-block;
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  
  .mb-12 {
    margin-bottom: 12px;
  }
 .mb-24{
   margin-bottom: 24px;
 }
 .mb-36{
   margin-bottom: 36px;
 }

  @media print {
    .no-print, .no-print * {
      display: none !important;
    }
  }

`;
