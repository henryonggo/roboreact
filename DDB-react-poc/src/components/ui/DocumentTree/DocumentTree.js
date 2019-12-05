import React, { Component } from "react";
import "./DocumentTree.scss";
import PropTypes from "prop-types";

import { Treebeard, decorators } from "react-treebeard";
import CheckableHeader from "./CheckableHeader";
import { linkCustomData } from "components/hoc";

import { DOCUMENT_TREE_LOADING } from "constants/language";

const oDecorators = {
    ...decorators,
    Header: CheckableHeader,
    Loading: () => <span>{DOCUMENT_TREE_LOADING}</span>
};

const oStyles = {
    tree: {
        lineHeight: "50px",
        base: { backgroundColor: "white" },
        node: {
            activeLink: { background: "rgba(255,255,255,0.15)" },
            header: {
                title: {
                    lineHeight: "1.75rem",
                    verticalAlign: "middle"
                }
            }
        }
    }
};

const oAnimations = {
    toggle: ({ node: { toggled } }) => ({
        animation: { rotateZ: toggled ? 90 : 0 },
        duration: 100
    }),
    drawer: (/* props */) => ({
        enter: {
            animation: "slideDown",
            duration: 100
        },
        leave: {
            animation: "slideUp",
            duration: 100
        }
    })
};

export class DocumentTree extends Component {
    constructor(props) {
        super(props);

        // Link tree selector to Formik namespace prop.
        oDecorators.Header = linkCustomData(CheckableHeader, this.props.name);
        this.state = {
            cursor: undefined
        };
    }

    onToggle = (node, toggled) => {
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState({ cursor: node });
    }

    render() {
        const { data } = this.props;
        return (
            <div className="DocumentTree">
                <Treebeard
                    data={data}
                    onToggle={this.onToggle}
                    animations={oAnimations}
                    decorators={oDecorators}
                    style={oStyles}
                />
            </div>
        );
    }
}

DocumentTree.propTypes = {
    // Formik custom data namespace.
    name: PropTypes.string,

    // Data representation of doc tree.
    data: PropTypes.object
};

export default DocumentTree;
