import React from 'react'
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import './button.scss'

export const ArtButton = ({
  className,
  size,
  variant,
  onClick,
  disabled,
  buttonText,
  spinner
}: any) => {
  return (
    <Button
      className={`${className} art-btn-wrapper`}
      size={size}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
      {spinner && (
        <div className='btn-spinner'>
          <CircularProgress />
        </div>
      )}
    </Button>
  )
}
