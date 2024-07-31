import { useState } from "react";

// Define a custom hook for dialog handling
const useCustomDialogHandler = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleCancelDialog = () => {
        console.log('Dialog Cancelled');
        handleCloseDialog();
    };
    const handleSaveDialog = () => {
        console.log('Dialog Saved');
        handleCloseDialog();
    };

    return { openDialog, handleOpenDialog, handleCloseDialog, handleCancelDialog, handleSaveDialog };
};

export default useCustomDialogHandler;