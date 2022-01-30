import React, { useState } from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Wrapper from "../components/wrapper";
import { connect } from 'react-redux';


const Theme = ({ children }) => {

    const [mode, setMode] = useState('dark');

    const changeMode = (value) => {
        setMode(value);
    }

    return (
        <ThemeProvider theme={{ mode }}>
            <Wrapper>
                <GlobalStyles />
                {children}
            </Wrapper>
        </ThemeProvider>
    );
};
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Theme); 
