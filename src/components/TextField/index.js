import React from 'react'
import TextField from '@mui/material/TextField'
import './textField.scss'

export const ArtTextField = ({
  label,
  type,
  placeholder,
  value,
  helperText,
  onChange,
  className,
  error,
  onBlur,
  required,
  disabled,
  multiline= false
}) => {
  const alteredLabel = required ? `${label}*` : label
  return (
    <TextField
      type={type}
      className={className ? className : 'form-in-box'}
      label={alteredLabel}
      placeholder={placeholder}
      error={error}
      helperText={error ? helperText : ''}
      variant="outlined"
      fullWidth
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      multiline={multiline}
      rows={multiline ? 1 : 0}
      inputProps={{
        autoComplete: 'new-password',
      }}
    />
  )
}
