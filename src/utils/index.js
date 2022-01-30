import {forEach, get, has, head, includes, lowerCase} from "lodash";
import moment from "moment";
import {toast} from "react-toastify";

const hasAccess = (items = [], can = "") => {
  let access = false;
  can = can.split(" ");
  items = items.map(({ name }) => name);
  can.map((item) => {
    if (includes(items, item)) {
      access = true;
    }
  });
  return access;
};

const saveFile = (file, name = moment(), extension = "xlsx") => {
  const blob = new Blob([file.data]);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${name}.${extension}`;
  link.click();
  URL.revokeObjectURL(link.href);
};
const showError = (e, setError, isField = true) => {
  forEach(get(e, "response.data.errors", []), (error) => {
    if (has(error, "fieldName") && isField) {
      setError(get(error, "fieldName"), {
        type: "manual",
        message: get(error, "errorMsg"),
      });
    } else {
      toast.error(get(error, "errorMsg"));
    }
  });
};
const showError2 = (error) => {
  toast.error(error);
};

const showMessage = (text) => {
  toast.info(text);
};

const getPhoneWithMask = (phoneNumber) => {
  phoneNumber = phoneNumber.split("");
  phoneNumber.splice(4, 0, " ");
  phoneNumber.splice(7, 0, " ");
  phoneNumber.splice(11, 0, " ");
  phoneNumber.splice(14, 0, " ");
  phoneNumber.splice(12, 1, "*");
  phoneNumber.splice(13, 1, "*");
  phoneNumber.splice(15, 1, "*");
  phoneNumber.splice(16, 1, "*");
  return phoneNumber.join("");
};

const getQueryParams = (search, param = "phone") => {
  const query = new URLSearchParams(search);
  return atob(query.get(param));
};
const getIconName = (module = "") => {
  switch (module) {
    case "ACADEMIC":
      return "icon-home";
    case "ACCOUNT":
      return "icon-account";
    case "DOCS":
      return "icon-docs";
    case "HRM":
      return "icon-hrm";
    case "PROJECTS":
      return "icon-projects";
    case "REPORTS":
      return "icon-reports";
    case "SALES":
      return "icon-sales";
    case "SETTING":
      return "icon-settings";
    default:
      return "icon-home";
  }
};

const getUrlFromName = (name) => {
  return lowerCase(name).split(" ").join("/");
};

const getMaskFromPhoneNumber = (prefix) => {
  switch (prefix) {
    case "998":
      return "\\+ \\9\\98 99 999 99 99";
    case "7":
      return "\\+ 7 999 999 99 99";
    default:
      return;
  }
};
const getPlaceholderFromPhoneNumber = (prefix) => {
  switch (prefix) {
    case "998":
      return "+ 998 -- --- -- --";
    case "7":
      return "+ 7 --- --- -- --";
    default:
      return "Enter";
  }
};

const getSelectOptionsListFromData = (data = [], value = 'id', label = 'title') => {
  return data.map(item => ({value: item[value], label: item[label]})) || [];
}

const cropText = (text) => {
  if(text.length >= 20){
    return text.slice(0, 18)+'...';
  }
  return text;
}
const getWordFromString = (string = "",length = 1) => {
  let title = string;
  if(length > 5){
    title = head(string.split(" ")) || "";
  }
 return cropText(title);
}

export {
  hasAccess,
  saveFile,
  showError,
  showError2,
  showMessage,
  getPhoneWithMask,
  getQueryParams,
  getIconName,
  getUrlFromName,
  getMaskFromPhoneNumber,
  getPlaceholderFromPhoneNumber,
  getSelectOptionsListFromData,
  getWordFromString,
  cropText
};

