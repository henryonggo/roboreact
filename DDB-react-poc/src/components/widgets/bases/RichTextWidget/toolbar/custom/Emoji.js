import React from "react";
import "./Emoji.scss";
import PropTypes from "prop-types";

import ToolbarOption from "../components/ToolbarOption";
import { Transition } from "react-spring/renderprops";
import { InsertEmoticon } from "@material-ui/icons";

import { RICH_TEXT_WIDGET } from "constants/language";

export const Emoji = (props) => {
    const { expanded, config, onChange, onExpandEvent, } = props;

    const renderEmojiPicker = (styleProps) => {
        return (
            <div className="EmojiPickerWrapper" style={styleProps} onClick={(e) => e.stopPropagation()}>
                {
                    config.emojis.map((i_sEmoji, i_sIndex) => {
                        return (
                            <div
                                className="Emoji"
                                key={i_sIndex}
                                onClick={() => onChange(i_sEmoji)}
                            >
                                {i_sEmoji}
                            </div>
                        );
                    })
                }
            </div>
        );
    };

    return (
        <div className="EmojiOption">
            <ToolbarOption
                active={expanded}
                title={RICH_TEXT_WIDGET.EMOJI_OPTION.TITLE}
                onClick={onExpandEvent}
            >
                <InsertEmoticon />
            </ToolbarOption>
            <Transition
                items={expanded}
                keys={picker => picker}
                from={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                enter={{ opacity: 1, transform: "scaleY(1) translateY(0)" }}
                leave={{ opacity: 0, transform: "scaleY(0.9) translateY(-20px)" }}
                config={{ tension: 500, friction: 30, clamp: true }}
            >
                {show => show && (styleProps => (
                    renderEmojiPicker(styleProps)
                ))}
            </Transition>
        </div>
    );
};

Emoji.propTypes = {
    config: PropTypes.object.isRequired,
    currentState: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func.isRequired
};

Emoji.defaultProps = {
    expanded: false
};

export default Emoji;