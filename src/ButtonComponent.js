import React from 'react';
import PropTypes from 'prop-types';

class ButtonComponent extends React.Component {
    render () {
        return <button onClick={this.props.onClick}>{this.props.value}</button>;
    }
}

ButtonComponent.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func
};

export default ButtonComponent;
