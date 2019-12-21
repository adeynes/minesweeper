import React from 'react'
import PropTypes from 'prop-types'
import Vector2 from './Vector2';
import SquareStatus from './SquareStatus'

class Square {
    constructor (index, status, hasMine, neighborMineCount) {
        this.index = index;
        this.status = status;
        this.hasMine = hasMine;
        this.neighborMineCount = neighborMineCount;
    }
}

Square.propTypes = {
    index: PropTypes.instanceOf(Vector2),
    status: PropTypes.instanceOf(SquareStatus),
    hasMine: PropTypes.bool,
    neighborMineCount: PropTypes.number
};

let DefaultSquare = (id) => { return new Square(id, SquareStatus.NONE, false, 0) };

class HtmlElementData {
    constructor (content, className) {
        this.content = content;
        this.className = className;
    }
}

class SquareComponent extends React.Component {
    getHtmlElementData () {
        let value = this.props.value;
        let content;
        let className;

        switch (value.status) {
            case SquareStatus.REVEALED:
                if (this.props.value.hasMine) {
                    content = '';
                    className = '_mine';
                } else {
                    content = value.neighborMineCount !== 0 ? value.neighborMineCount : '' ;
                    className = '_' + value.neighborMineCount;
                }
                break;
            case SquareStatus.FLAGGED:
                content = '';
                className = '_flag';
                break;
            default:
                content = '';
                className = '_default';
                break;
        }

        return new HtmlElementData(content, className);
    }

    onClick (event) {
        if (this.props.alive) {
            this.props.onClick(this.props.value.index, event);
        }
    }

    render () {
        let data = this.getHtmlElementData();

        return (
            <td
                className={data.className}
                onClick={(event) => this.onClick(event)}
                onContextMenu={(event) => this.onClick(event)}
            >
                    {data.content}
            </td>
        );
    }
}

SquareComponent.propTypes = {
    value: PropTypes.instanceOf(Square),
    alive: PropTypes.bool,
    onClick: PropTypes.func
};

export { Square, DefaultSquare, SquareStatus, SquareComponent };
