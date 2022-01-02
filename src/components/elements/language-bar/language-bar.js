import React from "react";
import styled from "styled-components";

const LanguageBarStyle = styled.div`
  background: #353945;
  padding: 17px 24px;
  border-radius: 10px;
  .languages {
    list-style: none;
    justify-content: space-between;
    width: 70%;
    display: flex;
    .languages__item {
      padding: 7px 10px;
      outline: none;
      border: none;
      border-radius: 4px;
      color: #fff;
      font-weight: 700;
      font-size: 12px;
      line-height: 12px;
      cursor: pointer;
    }
  }
  .uz {
    background: #45b26b;
  }
  .en {
    background: #ef466f;
  }
  .ru {
    background: #3772ff;
  }
`;

const LanguageBar = () => {
  return (
    <LanguageBarStyle>
      <div className="languages">
        <div className="languages__item uz">UZ</div>
        <div className="languages__item en ">EN</div>
        <div className="languages__item ru">RU</div>
      </div>
    </LanguageBarStyle>
  );
};

export default LanguageBar;
