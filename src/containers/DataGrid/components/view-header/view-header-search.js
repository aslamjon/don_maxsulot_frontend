import Search from "components/search";
import React from "react";

const ViewHeaderSearch = ({ searchFields, searchFromView, search }) => {
  return <Search searchFields={searchFields} searchFromView={searchFromView} search={search} />;
};

export default ViewHeaderSearch;
