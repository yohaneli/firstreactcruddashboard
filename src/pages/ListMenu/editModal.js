import React , {useContext} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SaveIcon from '@material-ui/icons/SaveAlt';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { FirebaseContext } from 'components/Firebase';
import { useSelector } from 'react-redux';
// use selector sert a lire les reducers
import { useDispatch } from 'react-redux';
// usedispatch permet d'ecrire ou de dispatcher
import {affMenu} from 'redux/actions/menu';


const useStyles = makeStyles((theme) => ({
    root: {
      transform: 'translateZ(0px)',
      flexGrow: 1,
    },
    exampleWrapper: {
      position: 'relative',
      marginTop: theme.spacing(3),
      height: 380,
    },
    radioGroup: {
      margin: theme.spacing(1, 0),
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
  }));
  

const EditModal = () => {

  const {queryAddMenu,queryOneMenu} = useContext(FirebaseContext);

  const classes = useStyles();

  const {menu : {affModalMenu,data}} = useSelector(state => state);

  let id = "";

  let name = "";

  let position = "";

  let titleModal = "Création d'un nouveau menu"

  if (data !== null) {
    id = data.id;
    name = data.name;
    position = data.position;
    titleModal = "Modification d'un menu "
  }
  
  /*
  Méthodes pour lire le reducer via useSelector avec 3 méthodes la premiere classique, le premier destructuring et le destructuring ultime
  
  const data = useSelector(state =>state);

  const {menu} = useSelector(state => state);

  */



  console.log(affModalMenu);

  const dispatchMenu = useDispatch();

  const [open, setOpen] = React.useState(false);

  const [openSpeed, setOpenSpeed] = React.useState(false);

  const [valueName, setValueName] = React.useState(name);

  const [valuePosition, setValuePosition] = React.useState(position);

  const onChangeName = (e) => {
    console.log(e.target.value);
    (e.target.value != undefined) && setValueName(e.target.value);
  }

    const onChangePosition = (e) => {
        console.log(e.target.value);
        (e.target.value != undefined) && setValuePosition(e.target.value);
    }

    const createMenu = async () => {
        console.log("save",id,valueName,valuePosition);
        if (data != null) {
          queryOneMenu(id).update({
            name:valueName,
            position:valuePosition
          })
        } else {
          queryAddMenu({image:"nc",name:valueName,position:valuePosition})
        }

        handleClose();
        //await queryAddMenu({name:valueName,position:valuePosition});
        //await queryOneMenu(id).delete();
        //console.log(queryOneMenu);
    }

  const handleClickOpen = () => {
    //setOpen(true);
    dispatchMenu(affMenu({affModalMenu : !affModalMenu,data:null}))
    
  };

  const handleClose = () => {
    dispatchMenu(affMenu({affModalMenu : false,data:null}))
  };

  return (
    <div>
        <SpeedDial 
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClick={handleClickOpen}
          open={openSpeed}
          direction={"up"}
          hidden={affModalMenu}
          />
          
        
      <Dialog open={affModalMenu} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{titleModal}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TextField 
                id="name" 
                label="Nom du menu" 
                variant="outlined" 
                onChange={onChangeName}
                defaultValue={name}
                />
          </DialogContentText>
          <DialogContentText>
                <TextField 
                id="position" 
                label="Position" 
                variant="outlined" 
                type="number"
                onChange={onChangePosition}
                defaultValue={position}
                />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={createMenu} color="primary">
            Enregister
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditModal;
