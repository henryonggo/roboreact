import React from "react";

export const linkCustomData = (Component, i_sCustomDataNamespace) => {
    return (props) => {
        return (
            <Component {...props} name={i_sCustomDataNamespace}/>
        );
    };
};

export default linkCustomData;