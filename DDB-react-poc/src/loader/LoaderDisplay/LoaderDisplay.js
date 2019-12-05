import React from "react";
import "./LoaderDisplay.scss";
import * as LANG_CONST from "constants/language";
import SpinnerLoader from "components/ui/loaders/SpinnerLoader/SpinnerLoader";
import PrimaryButton from "components/ui/button/PrimaryButton/PrimaryButton";


const LoaderDisplay = (props) => {
    if (props.error) {
        return (
            <div className="LoaderDisplay LoaderDisplay__error">
                <div className="LoaderDisplay__error-text">
                    { LANG_CONST.LOADER_ERROR_ERR }
                </div>
                <PrimaryButton className="LoaderDisplay__retry-btn" onClick={props.retry}>
                    { LANG_CONST.RETRY_BTN_TEXT }
                </PrimaryButton>
            </div>
        );
    } else if (props.timedOut) {
        return (
            <div className="LoaderDisplay LoaderDisplay__timeout">
                <div className="LoaderDisplay__timeout-text">
                    { LANG_CONST.LOADER_TIMEDOUT_ERR }
                </div>
                <PrimaryButton className="LoaderDisplay__retry-btn" onClick={props.retry}>
                    { LANG_CONST.RETRY_BTN_TEXT }
                </PrimaryButton>
            </div>
        );
    } else if (props.pastDelay) {
        return (
            <div className="LoaderDisplay LoaderDisplay__loading">
                <SpinnerLoader className="LoaderDisplay__spinner" size="2rem" thickness="0.2rem"/>
            </div>
        );
    } else {
        return null;
    }
};

export default LoaderDisplay;