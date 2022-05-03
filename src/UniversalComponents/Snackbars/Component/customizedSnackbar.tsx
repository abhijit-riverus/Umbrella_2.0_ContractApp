import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { green, red } from '@material-ui/core/colors';

interface Props {
    isSuccess: boolean;
    isOpen: boolean;
}
function SuccessAlert(props: AlertProps) {
    return <MuiAlert elevation={6} icon={<CheckIcon style={{ color: green[500] }} />} variant="filled" {...props} />;
}

function FailureAlert(props: AlertProps) {
    return <MuiAlert elevation={6} icon={<ClearIcon style={{ color: red[500] }} />} variant="filled" {...props} />;
}

// const useStyles = makeStyles((theme: Theme) => ({
//     root: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(15),
//         },
//     },
// }));

export default function CustomizedSnackbar(props: Props) {
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (props.isOpen === true) {
            setOpen(props.isOpen);
        }
    }, [props.isOpen])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        // <div className={classes.root}>
        <div>
            <Snackbar style={{ marginTop: '5rem' }} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} open={open} autoHideDuration={4000} onClose={handleClose}>
                {props.isSuccess ?
                    <SuccessAlert style={{ background: 'black' }} onClose={handleClose}>
                        Report Saved Successfully!
                    </SuccessAlert>
                    :
                    <FailureAlert style={{ background: 'black' }} onClose={handleClose}>
                        Error while saving Report!
                    </FailureAlert>
                }
            </Snackbar>
        </div>
    );
}
