import React , {useContext,useState,useEffect,Fragment} from 'react';
import { ListPage } from 'material-ui-shell/lib/containers/Page';
import Page from 'material-ui-shell/lib/containers/Page';
import { FirebaseContext } from 'components/Firebase';
import CircularProgress  from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useIntl } from 'react-intl';
import { IconButton } from '@material-ui/core'
import DeleteProduct from './deleteProduct';
import AddImageProduct from './addImageProduct';
import ModalCreateOrUpdateProduct from './modalCreateOrUpdateProduct';
import { DescriptionOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
// use selector sert a lire les reducers
import { useDispatch } from 'react-redux';
// usedispatch permet d'ecrire ou de dispatcher
import {affProduct} from 'redux/actions/product';

const fields = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'description',
    label: 'description',
  },
  {
    name: 'price',
    label: 'price',
  },
]

const Row = ({ index, style, data }) => {

  const {product : {affModalProduct}} = useSelector(state => state);

  const { id , name, description , price = '', image } = data;

  const dispatchProduct = useDispatch();

  const checkPrice = "Prix non défini";

  const openEditModalProduct = () => {

    console.log(data);

    dispatchProduct(affProduct({affModalProduct : !affModalProduct,data}))

  }

  const affichagePrix = (price) => {
    return (price !== undefined) ? `Prix - ${price}€`: "Pas de prix défini"
  }

  return (
    <div key={`${id}`} style={style}>
      <ListItem alignItems="space-between" flexDirection="column" style= {{marginTop:10,marginBottom:10}} >

        {/* condition qui vérifie si une image existe en base avant de l'afficher  */}

      { (image !== 'nc' && image !== undefined) && <Avatar alt={name} src={image} style={{marginRight:20}} />}

        <ListItemText
          primary={`Nom du produit : ${name} - Description : ${description} ${affichagePrix(price)}`}
          // secondary={(price == undefined) && `${checkPrice}`:`- Prix du produit : ${price} €`}
        />
      <IconButton aria-label="delete" onClick={openEditModalProduct}>
          <DescriptionOutlined fontSize="large"/>
      </IconButton>
      <AddImageProduct id={id}/>
      <DeleteProduct id={id}/>  
      </ListItem>
      <Divider />
    </div>
  )
}

// Création d'un composant chargement qui va gérer et afficher un cercle de chargement ainsi qu'un petit message avant une requête

const Chargement = ({message,loading}) => {

  const intl = useIntl();

  return (
    <Page pageTitle={intl.formatMessage({ id: 'Loading' , defaultMessage: message })} >
      {
        loading ?
        <CircularProgress color="secondary" /> :
        <span>Pas de produits</span>
      }
    </Page>
  )
}

const PageListProduct = ({listProducts}) => {

  const intl = useIntl()

  return (
    <ListPage
      name="list_demo"
      list={listProducts}
      fields={fields}
      Row={Row}
      listProps={{ itemSize: 91 }}
      getPageProps={(list) => {
        return {
          pageTitle: intl.formatMessage(
            {
              id: 'list_page_product',
              defaultMessage: 'Liste des produits ( {count} lignes ) ',
            },
            { count: list.length }
          ),
        }
      }}
    />
  )
}

const ListProduct = () => {

  // On va chercher le context sur lequel on va travailler + déstructuring pour utiliser la réquete voulue

  const {queryProducts} = useContext(FirebaseContext);

  //console.log(queryProducts);

  const [openModal, setOpenModal] = useState(false);


  // state qui va gérer la liste des produits

  const [listProducts, setListProducts] = useState([]);

  // state qui va gérer l'apparition du composant de chargement

  const [loading, setLoading] = useState(false);

  // useEffect qui va gérer l'affichage en temps réel de la liste des produits

  useEffect(() => {

    // on set le chargement true car on s'apprete a effectuer une requete

    setLoading(true);

    // a partir du contexte on fait la requete qui affichera les produits

    queryProducts().onSnapshot(data => {
      
      //console.log(data);

      //console.log(data.empty);

      // creation d'un tableau temporaire 

      let tempListProduct = [];

        // on verifie si le tableau n'est pas vide avant de boucler

        !data.empty && data.forEach(item => {

          //console.log(item);

          //console.log(item.data());

          //console.log(item.data().name);

          // on remplit le tableau temporaire avec le résultat de la boucle

          tempListProduct.push({id:item.id , ...item.data()});

          //console.log(tempListProduct);

        })

        // petit temps d'attente 

        setTimeout(() => {

          // plus besoin du chargement, la requete se termine

        setLoading(false);

          // grace au setter , le tableau temporaire devient le tableau listProducts 

        setListProducts(tempListProduct);

      },1000)

    })
    return () => {
      
    }
  }, [])

  // on ne renvoie la liste des produits que si la taille du tableau est superieur a 0 sinon on affiche le composant Chargement

  return (

    <Fragment>
      <ModalCreateOrUpdateProduct/>
    {
   !loading && listProducts.length>0? <PageListProduct listProducts={listProducts}/> :
   <Chargement message={"Loading"} loading={loading}/>
    }
   </Fragment>
  )
}

export default ListProduct;
