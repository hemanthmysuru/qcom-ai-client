import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import styles from './CustomDialog.module.scss';
import { Divider } from '@mui/material';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import CustomButton from '../CustomButton/CustomButtonComponent';

// Define the props interface for the dialog component
export interface ICustomDialogProps {
    headerLabel: string;
    open: boolean;
    content: React.ReactNode;
    cancelText?: string;
    saveText?: string;
    dialogMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    isSaveDisabled?: boolean;
    onClose: () => void;
    onCancel: () => void;
    onSave: () => void;
}

const CustomDialog: React.FC<ICustomDialogProps> = ({
    headerLabel,
    open,
    content,
    dialogMaxWidth = 'sm',
    cancelText = 'Cancel',
    saveText = 'Save',
    isSaveDisabled = false,
    onClose,
    onCancel,
    onSave,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={dialogMaxWidth}
            classes={{
                paper: styles.dialogPaper,
            }}
        >
            <DialogTitle className={styles.dialogTitle}>
                <span>{headerLabel}</span>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    {/* <CloseIcon /> */}
                    <SvgIcon name='close' />
                </IconButton>
            </DialogTitle>
            {/* <Divider className={styles.divider} /> */}
            <DialogContent className={styles.dialogContent}>
                {content}
            </DialogContent>
            <Divider className={styles.divider} />
            <DialogActions className={styles.dialogActions}>
                <CustomButton
                    text={cancelText}
                    variant="outlined"
                    className={styles.dialogOutlinedButton}
                    onClick={onCancel}
                />
                <CustomButton
                    text={saveText}
                    variant="contained"
                    className={styles.dialogContainedButton}
                    onClick={onSave}
                    disabled={isSaveDisabled}
                />
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
