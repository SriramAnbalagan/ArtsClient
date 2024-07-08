import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import {Typography} from '@mui/material'
import {ArtButton} from '../Button'
import './modal.scss'

export const ArtsModal = ({
  open,
  className,
  handleClose,
  handleConfirm,
  children,
  fullScreen,
  title,
  disabled,
  showSpinner = false,
  confrimBtnText
}) => {
  const onClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return
    handleClose(false)
  }
  return (
    <div>
      <Dialog
        className={className ? className : 'modal-dialog'}
        fullScreen={fullScreen}
        open={open}
        onClose={(event, reason) => !showSpinner && onClose(event, reason)}
      >
        <Toolbar>
          <div className="dialog-header">
            <div className="dialog-title">
              {title && (
                <Typography variant="h4">
                  {title}
                </Typography>
              )}
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
        <div className='modal-content'>
          {children}
        </div>
      </Dialog>
    </div>
  )
}
