import React from "react";
import PropTypes from "prop-types";


export default class ButtonComponent extends React.Component {
    render() {
        return <button onClick={this.props.onClick}>{this.props.value}</button>;
    }
}


ButtonComponent.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func
};
