import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles.styl'
import Label from '../Label'
import { default as LabelStyles } from '../Label/styles.styl'
import Input from '../Input'
import Textarea from '../Textarea'

class InputPassword extends React.Component {
  state = {
    visible: false
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible })
  }
  render() {
    const { hideLabel, showLabel } = this.props
    return (
      <div className={styles['wrap-input-password']}>
        {this.props.showVisibilityButton && (
          <div
            className={cx(LabelStyles['c-label'], styles['action-on-input'])}
            onClick={() => this.toggleVisibility()}
          >
            {this.state.visible ? hideLabel : showLabel}
          </div>
        )}
        <Input
          {...this.props}
          type={this.state.visible ? 'text' : 'password'}
        />
      </div>
    )
  }
}

InputPassword.propTypes = {
  hideLabel: PropTypes.string,
  showLabel: PropTypes.string,
  showVisibilityButton: PropTypes.bool
}
InputPassword.defaultProps = {
  hideLabel: '',
  showLabel: '',
  showVisibilityButton: true
}

const Field = props => {
  const {
    className,
    label,
    secondaryLabels,
    id,
    type,
    value,
    placeholder,
    error,
    onChange,
    readOnly
  } = props

  const inputType = type => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            id={id}
            placeholder={placeholder}
            value={value}
            error={error}
            onChange={onChange}
            readOnly={readOnly}
          />
        )
      case 'password':
        return (
          <InputPassword
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            error={error}
            onChange={onChange}
            readOnly={readOnly}
            {...secondaryLabels}
          />
        )
      case 'email':
      case 'url':
      case 'text':
        return (
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            error={error}
            onChange={onChange}
            readOnly={readOnly}
          />
        )
      default:
        throw new Error(
          'type must be text, password, email, url or textarea, got ' + type
        )
    }
  }

  return (
    <div className={cx(styles['o-field'], className)}>
      <Label htmlFor={id}>{label}</Label>
      {inputType(type)}
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'url', 'textarea']),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  secondaryLabels: PropTypes.object
}

Field.defaultProps = {
  label: '',
  id: '',
  type: 'text',
  value: '',
  placeholder: '',
  error: false,
  secondaryLabels: {}
}

export default Field
