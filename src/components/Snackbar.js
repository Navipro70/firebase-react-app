import React, {useEffect, useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

export const SnackbarError = ({errorMessage, opened}) => {
    const [isOpened, setOpened] = useState(false);
    useEffect(() => setOpened(opened), [opened]);
    const handleClose = () => {
        setOpened(false)
    };
    return (
        <Snackbar open={isOpened} autoHideDuration={6000}>
            <MuiAlert elevation={6} variant="filled"  onClose={handleClose} severity="error">
                {errorMessage}
            </MuiAlert>
        </Snackbar>
    )
};