import React , {useContext,useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSnackbar } from 'notistack';
import { FirebaseContext } from 'components/Firebase';

// Composant qui va gérer la suppression d'un produit qui prend en paramètre l'id du produit

const affSnackBar = (enqueueSnackbar,msg) => {

    enqueueSnackbar(msg, {
        variant: 'info',
        anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
        },
    })
      
}

const DeleteProduct = ({id}) => {

    // On va chercher le context sur lequel on va travailler + déstructuring pour utiliser la réquete voulue

    const {queryOneProduct} = useContext(FirebaseContext);

    //console.log(queryOneProduct);

    const { enqueueSnackbar } = useSnackbar();

    // state qui gère l'ouverture et la fermeture du modal

    const [openModalDelete, setOpenModalDelete] = useState(false);

    // fonction qui gere le clic d'ouverture du modal

    const handleClickOpenModalDelete = () => {

        setOpenModalDelete(true);

    };
    
    // fonction qui gere le clic de fermeture du modal
 
    const handleCloseModalDelete = () => {

        setOpenModalDelete(false);

    };

    // fonction qui effectue la réquete de suppression

    const deleteProduct = async () => {

        //console.log(id);

        affSnackBar(enqueueSnackbar," Suppression réussie ");

        await queryOneProduct(id).delete();

    }

    return (
            <div>

                <IconButton color="secondary" onClick={handleClickOpenModalDelete}>
                    <DeleteIcon/>
                </IconButton>

                <Dialog
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >

                    <DialogTitle id="alert-dialog-title">{"Confirmation la suppression du produit"}</DialogTitle>

                    <DialogContent>

                        <DialogContentText id="alert-dialog-description">
                        Etes-vous sur de vouloir supprimer ce produit ?
                        </DialogContentText>

                    </DialogContent>

                    <DialogActions>

                        <Button onClick={handleCloseModalDelete} color="secondary">
                        Non
                        </Button>

                        <Button onClick={deleteProduct} color="primary" autoFocus>
                        Oui
                        </Button>

                    </DialogActions>

                </Dialog>

            </div>
                    
            )
}

export default DeleteProduct;