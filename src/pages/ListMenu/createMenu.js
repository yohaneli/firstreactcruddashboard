import React , {useContext,useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { FirebaseContext } from 'components/Firebase'

const CreateMenu = ({name,position}) => {
    const {queryAddMenu,queryTestMethodeCreate} = useContext(FirebaseContext);
    //console.log(queryAddMenu);
    const [open, setOpen] = useState(false);
    const [valueName, setValueName] = useState(name);

    const [valuePosition, setValuePosition] = useState(position);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const onChangeName = (e) => {
        console.log(e.target.value);
        (e.target.value != undefined) && setValueName(e.target.value);
    }
    
    const onChangePosition = (e) => {
        console.log(e.target.value);
        (e.target.value != undefined) && setValuePosition(e.target.value);
    }

    const createMenu = async () => {
        //await queryAddMenu({name:valueName,position:valuePosition});
        //await  queryTestMethodeCreate().set({name:valueName,position:valuePosition});
        //await queryOneMenu(id).delete();
        //console.log(queryOneMenu);
    }
    //console.log(queryOneMenu);
    return (
            // <IconButton variant="contained" color="secondary" onClick={() => deleteMenu(id)}/>
            <div>
                    <IconButton color="secondary" onClick={handleClickOpen}>
                    <AddCircleIcon/>
                    </IconButton>
                    
                        <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Création d'un menu"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">

                                    <TextField 
                                    id="name" 
                                    label="Nom du menu" 
                                    variant="outlined" 
                                    onChange={onChangeName}
                                    />

                                    <TextField 
                                    id="position" 
                                    label="Position" 
                                    variant="outlined" 
                                    type="number"
                                    onChange={onChangePosition}
                                    />      

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                            Annuler
                            </Button>
                            <Button onClick={createMenu} color="primary" autoFocus>
                            Créer
                            </Button>
                        </DialogActions>
                        </Dialog>
            </div>
            
    )
}

export default CreateMenu;
