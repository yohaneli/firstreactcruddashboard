import React , {useContext,useEffect} from 'react';
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
import {affProduct} from 'redux/actions/product';
import { useSnackbar } from 'notistack';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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

  const affSnackBar = (enqueueSnackbar,msg) => {

    enqueueSnackbar(msg, {
        variant: 'info',
        anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
        },
    })
      
}

  const ModalCreateOrUpdateProduct = () => {

    // On va chercher le context sur lequel on va travailler + déstructuring pour utiliser la réquete voulue

    const {queryAddProduct,queryOneProduct,queryMenus} = useContext(FirebaseContext);
  
    //console.log(queryMenus);

    const [dataMenu, setDataMenu] = React.useState(null)

    useEffect(() => {
        queryMenus().get().then(snapshot => {

            let dataMenus = snapshot.docs.map(menu => {
    
                return(
                    {id: menu.id, ...menu.data()})
    
                    
                })
                
                setDataMenu(dataMenus);
    
        })
        return () => {
            
        }
    }, [])

    //console.log(queryAddProduct,queryOneProduct);

    const classes = useStyles();
  
    const {product : {affModalProduct,data}} = useSelector(state => state);
  
    let id = "";
  
    let name = "";
  
    let description = "";

    let price = 0;

    let dateAdd = "";
  
    let titleModal = "Création d'un nouveau produit"
  
    if (data !== null) {
      id = data.id;
      name = data.name;
      description = data.description;
      price = data.price;
      dateAdd = Date.now();
      titleModal = "Modification d'un produit "
    }
    
    /*
    Méthodes pour lire le reducer via useSelector avec 3 méthodes la premiere classique, le premier destructuring et le destructuring ultime
    
    const data = useSelector(state =>state);
  
    const {menu} = useSelector(state => state);
  
    */
  
    console.log(affModalProduct);
  
    const dispatchProduct = useDispatch();
  
    const [openModalProduct, setOpenModalProduct] = React.useState(false);
  
    const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  
    const [valueName, setValueName] = React.useState(name);
  
    const [valueDescription, setValueDescription] = React.useState(description);

    const [valuePrice, setValuePrice] = React.useState(price);
  
    const onChangeName = (e) => {

      console.log(e.target.value);

      (e.target.value != undefined) && setValueName(e.target.value);

    }
  
    const onChangeDescription = (e) => {

        console.log(e.target.value);

        (e.target.value != undefined) && setValueDescription(e.target.value);

    }
    
    const onChangePrice = (e) => {

        console.log(e.target.value);

        (e.target.value != undefined) && setValuePrice(e.target.value);

    }
  
      const createProduct = async () => {

          console.log("save",id,valueName,valueDescription,valuePrice);

          if (data != null) {

            queryOneProduct(id).update({
              name:valueName,
              description:valueDescription,
              price:valuePrice,
              dateAdd : Date.now()
            })

          } else {

            queryAddProduct({image:"nc",name:valueName,description:valueDescription,price:valuePrice,dateAdd : Date.now()})

          }
  
          handleCloseModal();

      }
  
    const handleClickOpenModal = () => {

      //setOpen(true);

      dispatchProduct(affProduct({affModalProduct : !affModalProduct,data:null}))

      
    };
  
    const handleCloseModal = () => {

        dispatchProduct(affProduct({affModalProduct : false,data:null}))

    };
  
    return (
      <div>
          <SpeedDial 
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onClick={handleClickOpenModal}
            open={openSpeedDial}
            direction={"up"}
            hidden={affModalProduct}
            />
            
            <Dialog open={affModalProduct} onClose={handleCloseModal} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">{titleModal}</DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        <TextField 
                            id="name" 
                            label="Nom du produit" 
                            variant="outlined" 
                            onChange={onChangeName}
                            defaultValue={name}
                            />

                    </DialogContentText>

                    <DialogContentText>

                        <TextField 
                        id="description" 
                        label="description" 
                        variant="outlined" 
                        onChange={onChangeDescription}
                        defaultValue={description}
                        />

                    </DialogContentText>

                    <DialogContentText>

                        <TextField 
                        id="price" 
                        label="Prix" 
                        variant="outlined" 
                        type="number"
                        onChange={onChangePrice}
                        defaultValue={price}
                        />

                    </DialogContentText>

                    <DialogContentText>

                        <InputLabel id="demo-customized-select-label">Menu</InputLabel>
                            
                            <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value="Age"
                            fullWidth={true}
                            >
                                {(dataMenu != null) && dataMenu.map(item => (<MenuItem key={item.id} value={item.id}> <em>{item.name}</em> </MenuItem>) )}
                        

                        </Select>

                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button onClick={handleCloseModal} color="primary">
                    Annuler
                    </Button>

                    <Button onClick={createProduct} color="primary">
                    Enregister
                    </Button>

                </DialogActions>

            </Dialog>
      </div>
    );
  }
  
  export default ModalCreateOrUpdateProduct;
  