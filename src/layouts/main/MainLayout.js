import React from 'react';
import {connect} from "react-redux";
import {get} from "lodash";
import Sidebar from "../../components/sidebar/sidebar";
import Flex from "../../components/elements/flex";
import Content from "../../components/content";
import Toastify from "../../components/toastify";
import OverlayLoader from "../../components/loader/overlay-loader";


const MainLayout = ({children, user,loading,...rest}) => {
    return (
        <>
            {
                loading && <OverlayLoader />
            }
            <Flex>
                <Sidebar modules={get(user,'modules',[])}/>
                <Content>
                    <Toastify />
                    {children}
                </Content>
            </Flex>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        user: get(state, 'auth.user', {}),
        loading: get(state, 'settings.loading', false)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
