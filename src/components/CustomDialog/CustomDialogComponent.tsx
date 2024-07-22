import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../CustomButton/CustomButtonComponent';
import styles from './CustomDialog.module.scss';
import { Divider } from '@mui/material';

// Define the props interface for the dialog component
interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    content: React.ReactNode;
    onCancel: () => void;
    onSave: () => void;
    cancelText?: string;
    saveText?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
    open,
    onClose,
    content,
    onCancel,
    onSave,
    cancelText = 'Cancel',
    saveText = 'Save',
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            classes={{
                paper: styles.dialogPaper,
            }}
        >
            <DialogTitle className={styles.dialogTitle}>
                <span>Header Label</span>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider className={styles.divider} />
            <DialogContent>
                {content}
            </DialogContent>
            <Divider className={styles.divider} />
            <DialogActions className={styles.dialogActions}>
                <CustomButton
                    text={cancelText}
                    variant="outlined"
                    className={styles.dialogOutlinedButton}
                    onClick={onCancel}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'var(--dialogbox-outline-btn-hover-bg) !important', // Override hover state
                        }
                    }}
                />
                <CustomButton
                    text={saveText}
                    variant="contained"
                    className={styles.dialogContainedButton}
                    onClick={onSave}
                />
            </DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
