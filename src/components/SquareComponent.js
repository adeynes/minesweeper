import React from "react";
import PropTypes from "prop-types";

import Square from "model/square/Square";
import SquareStatus from "model/square/SquareStatus";


export default class SquareComponent extends React.Component {
    /**
     * @returns {{content: string, className: string}}
     */
    getHtmlAttributes() {
        let value = this.props.value;
        let content;
        let className;

        switch (value.status) {
            case SquareStatus.REVEALED:
                if (this.props.value.hasMine) {
                    content = "";
                    className = "_mine";
                } else {
                    content = value.neighborMineCount !== 0 ? value.neighborMineCount : "" ;
                    className = "_" + value.neighborMineCount;
                }
                break;
            case SquareStatus.FLAGGED:
                content = "";
                className = "_flag";
                break;
            default:
                content = "";
                className = "_default";
                break;
        }

        return {content: content, className: className};
    }

    /**
     * @param {Event} event
     */
    onClick(event) {
        this.props.onClick(this.props.value.index, event);
    }

    render() {
        let attributes = this.getHtmlAttributes();

        return (
            <td
                className={attributes.className}
                onClick={(event) => this.onClick(event)}
                onContextMenu={(event) => this.onClick(event)}
            >
                {attributes.content}
            </td>
        );
    }
}


SquareComponent.propTypes = {
    value: PropTypes.instanceOf(Square),
    onClick: PropTypes.func
};
