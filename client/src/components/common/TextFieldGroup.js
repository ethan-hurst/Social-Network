/* eslint-disable react/require-default-props */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name, placeholder, value, label, error, info, type, onChange, disabled,
}) => (
  <div className="form-group">
    <input type={type} className={classnames('form-control form-control-lg', { 'is-invalid': error })} placeholder={placeholder} name={name} value={value} onChange={onChange} disabled={disabled} />
    {info && <small className="form-text text-muted">{info}</small>}
    {error && (<div className="is-invalid">{error}</div>)}
  </div>
);

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  type: 'text',
};

export default TextFieldGroup;
