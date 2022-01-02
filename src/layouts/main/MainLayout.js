import React from 'react';
import { connect } from "react-redux";
import { get } from "lodash";
import Sidebar from "../../components/sidebar/sidebar";
import Flex from "../../components/elements/flex";


const MainLayout = ({ children, user }) => {
    return (
        <>
            <Flex>
                <Sidebar />
                {children}
            </Flex>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        user: get(state, 'auth.user', {})
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
