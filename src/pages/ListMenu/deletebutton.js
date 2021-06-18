import React , {useContext,useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { FirebaseContext } from 'components/Firebase'

const Deletebutton = ({id}) => {
    const {queryOneMenu} = useContext(FirebaseContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const deleteMenu = async () => {
        console.log(id);
        await queryOneMenu(id).delete();
        //console.log(queryOneMenu);
        //const menu = await queryOneMenu(id).get();
        //console.log(menu.data());
    }
    //console.log(queryOneMenu);
    return (
            // <IconButton variant="contained" color="secondary" onClick={() => deleteMenu(id)}/>
            <div>
                    <IconButton color="secondary" onClick={handleClickOpen}>
                    <DeleteIcon/>
                    </IconButton>
                    
                        <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Confirmation la suppression"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Etes-vous sur de supprimer ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                            Non
                            </Button>
                            <Button onClick={deleteMenu} color="primary" autoFocus>
                            Oui
                            </Button>
                        </DialogActions>
                        </Dialog>
            </div>
            
    )
}

export default Deletebutton;
