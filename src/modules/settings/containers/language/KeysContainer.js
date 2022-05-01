import React from 'react';
import DataGrid from "../../../../containers/DataGrid";
import LanguageKeyScheme from "../../../../schema/LanguageKeyScheme";

const KeysContainer = ({...rest}) => {
    return (
        <>
            <DataGrid
                url={{
                    ids: 'auth/v1/language/generic-view',
                    data: 'auth/v1/language/view-row',
                    viewOne: 'auth/v1/language/view-header',
                    viewList: '',
                    addOrEditCell:'auth/v1/language/value'
                }}
                entityName={'language-key'}
                scheme={LanguageKeyScheme}
            />
        </>
    );
};

export default KeysContainer;
