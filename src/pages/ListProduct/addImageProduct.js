import React , {useContext,useState} from 'react'
import { FirebaseContext } from 'components/Firebase'
import { useSnackbar } from 'notistack';
import CircularProgress  from '@material-ui/core/CircularProgress'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

// Composant qui gere l'ajout d'image d'un produit

// fonction qui verifie le type de fichier accepté (donc image)

const ExtensionIsOk = (extension) => {

    switch (extension) {

        case "image/png":

        case "image/jpg":

        case "image/jpeg":

            return true;

            break;
    
        default:

            return false;

            break;

    }

}

// composont qui fait la notification une fois la requete effectuee

const affSnackBar = (enqueueSnackbar,msg) => {

    enqueueSnackbar(msg, {
        variant: 'info',
        anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
        },
    })
      
}

const AddImageProduct = ({id}) => {

    // On va chercher le context sur lequel on va travailler + déstructuring pour utiliser la réquete voulue

    const {queryOneProduct,storage} = useContext(FirebaseContext);

    //console.log(queryOneProduct);

    const [loading, setLoading] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {

        //console.log(event);

        hiddenFileInput.current.click();

    }
    
    // fonction qui va effectuer la requete

    const addImageProduct = (e) => {

        setLoading(true);

        //console.log(e);

        //console.log(e.target);

        //console.log(e.target.files[0]);

        const file = e.target.files[0];

        // verification du type de fichier

        if (!ExtensionIsOk(file.type)) {

            console.log("Mauvais format de fichier");

            affSnackBar(enqueueSnackbar,"Mauvais type de fichier");

            return

        }

        const folderImg = `/images/menu/${id}/`;

        const uploadTask = storage.ref(`${folderImg}${file.name}`).put(file)

        //initiates the firebase side uploading 

        uploadTask.on('state_changed', 
        (snapShot) => {

        //takes a snap shot of the process as it is happening

        console.log(snapShot)

        }, (err) => {

            setLoading(false);

        //catches the errors

        console.log(err)
        }, () => {

        // gets the functions from storage refences the image storage in firebase by the children

        // gets the download url then sets the image from firebase as the value for the imgUrl key:

        storage.ref(`${folderImg}`).child(file.name).getDownloadURL()
        .then(async fireBaseUrl => {

            // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))

            //console.log("FIREBASE URL : ",fireBaseUrl);

            affSnackBar(enqueueSnackbar," Ajout de l'image réussi ");

            await queryOneProduct(id).update({image:fireBaseUrl});

            setLoading(false);

        })

        })

        const fileSize = file.size /1024/1024;

        console.log("La taille du fichier est de ",fileSize);

    }

    //console.log(queryOneMenu);

    return (
         (loading == true) ? <CircularProgress color="secondary" />:
         <div>
            <input 
            type="file" 
            ref={hiddenFileInput} 
            onChange={addImageProduct} 
            style={{display:"none"}} 
            />
            <IconButton color="primary" onClick={handleClick} component="span" aria-label="upload picture" >
                <PhotoCamera/>
            </IconButton>
        </div>
    )
}

export default AddImageProduct;
