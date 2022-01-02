import React from "react";
import ListView from "../../../../containers/ListView/ListView";
import ModuleScheme from "../../../../schema/ModuleScheme";
import ComponentBody from "./components/ComponentBody";
import LanguageBar from "../../../../components/elements/language-bar/language-bar";

const ListContainer = ({ ...rest }) => {
  return (
    <>
      <LanguageBar />
      <ListView
        storeName="module-list"
        entityName="module"
        url={`auth/v1/setting/modules`}
        scheme={ModuleScheme}
        ComponentBody={ComponentBody}
        ComponentHead={"head"}
        params={{}}
      />
    </>
  );
};

export default ListContainer;
