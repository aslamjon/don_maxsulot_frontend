import {forEach, get, has, includes} from "lodash";
import moment from "moment";
import {toast} from "react-toastify";

const hasAccess = (items = [], can = '') => {
    let access = false;
    can = can.split(' ');
    items = items.map(({name}) => name);
    can.map(item => {
        if (includes(items, item)) {
            access = true;
        }
    })
    return access;
}

const saveFile = (file,name=moment(),extension='xlsx') => {
    const blob = new Blob([file.data]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
}
const showError = (e,setError) => {
    forEach(get(e,'response.data.errors',[]),(error)=>{
        if(has(error,'fieldName')) {
            setError(get(error, 'fieldName'), {
                type: "manual",
                message: get(error, 'errorMsg'),
            });
        }else{
            toast.error(get(error, 'errorMsg'))
        }
    })
}

const getPhoneWithMask = (phoneNumber) => {
    phoneNumber = phoneNumber.split("");
    phoneNumber.splice(4,0," ");
    phoneNumber.splice(7,0," ");
    phoneNumber.splice(11,0," ");
    phoneNumber.splice(14,0," ");
    phoneNumber.splice(12,1,"*");
    phoneNumber.splice(13,1,"*");
    phoneNumber.splice(15,1,"*");
    phoneNumber.splice(16,1,"*");
    return phoneNumber.join("");
}

const getQueryParams = (search,param = 'phone') => {
    const query = new URLSearchParams(search);
    return atob(query.get(param));
}

export {hasAccess,saveFile,showError,getPhoneWithMask,getQueryParams}