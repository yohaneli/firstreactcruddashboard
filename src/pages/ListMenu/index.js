import React , {useContext,useState,useEffect,Fragment} from 'react'
import { ListPage } from 'material-ui-shell/lib/containers/Page'
import Page from 'material-ui-shell/lib/containers/Page'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { useIntl } from 'react-intl'
import CircularProgress  from '@material-ui/core/CircularProgress'
import Deletebutton from './deletebutton'
import Addimage from './addimage'
import { IconButton } from '@material-ui/core'
import { FirebaseContext } from 'components/Firebase'
import Avatar from '@material-ui/core/Avatar';
import EditModal from './editModal';
import { DescriptionOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
// use selector sert a lire les reducers
import { useDispatch } from 'react-redux';
// usedispatch permet d'ecrire ou de dispatcher
import {affMenu} from 'redux/actions/menu';


const fields = [
  {
    name: 'id',
    label: 'id',
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'position',
    label: 'position',
  },

]



const Row = ({ index, style, data }) => {

  
  const {menu : {affModalMenu}} = useSelector(state => state);
  
  const { id , name , position = "" , image} = data

  const dispatchMenu = useDispatch();

  const openEdit = () => {
    console.log(data);
    dispatchMenu(affMenu({affModalMenu : !affModalMenu,data}))
  }
  

  return (
    <div key={`${id}`} style={style}>
      <ListItem alignItems="space-between" flexDirection="column" style= {{marginTop:10,marginBottom:10}}>
        { (image !== 'nc' && image !== undefined) && <Avatar alt={name} src={image} style={{marginRight:20}} />}
        <ListItemText
          primary={`${name} - Position : ${position}`}
        />
        <IconButton aria-label="delete" onClick={openEdit}>
          <DescriptionOutlined fontSize="large"/>
        </IconButton>
        <Addimage id={id}/>
        <Deletebutton id={id}/>
      </ListItem>
      <Divider />
    </div>
  )
}


const InfoChargement = ({message,loading}) => {
  //console.log("Loading", message , loading)
  const intl = useIntl();
  return (
    <Page pageTitle={intl.formatMessage({ id: 'Loading' , defaultMessage: message})}>
      { loading?
        <CircularProgress color="secondary" />:
        <span>Pas de menu</span>
      }
    </Page>
  )
}

const PageListMenu = ({listMenu}) => {
  const intl = useIntl();
  return(

      <ListPage
          name="list_menu"
          list={listMenu}
          fields={fields}
          Row={Row}
          listProps={{ itemSize: 91 }}
          getPageProps={(list) => {
            return {
              pageTitle: intl.formatMessage(
                {
                  id: 'list_page_menu',
                  defaultMessage: 'Liste des Menus ( {count} lignes)',
                },
                { count: list.length }
              ),
            }
          }}
        />
  )
}

const ListMenu = () => {

  const {queryMenus} = useContext(FirebaseContext);

  const [open, setOpen] = useState(false);

  //console.log(queryMenus);

  const [listMenu, setMenu] = useState([]);

  const [loading, setLoading] = useState(false);

  //console.log(queryOneMenu);

  useEffect(() => {
    setLoading(true);
    queryMenus().onSnapshot(data => {
      //console.log(" data :",data);
      //console.log(" DATA EMPTY",data.empty)
      //console.log("type du snapshot : ",data,data.val)
      let tempListMenu=[];

      !data.empty && data.forEach(item => {
        //console.log(" item : ",item.data().name);
        tempListMenu.push({ id:item.id , ...item.data()})
      })
      setTimeout(() => {
        setLoading(false);
        setMenu(tempListMenu);
      },1000)
      

    })
    //setLoading(true)
    // setTimeout(() => {setLoading(false);
    //  setMenu([{
    //    "name":"Dope",
    //    "position":1
    //  },{
    //   "name":"Boy",
    //   "position":2
    // }
    // ])},5000)
    return () => {
    }
  }, [])


  return (      
        <Fragment>
          <EditModal/>
          {
         !loading && listMenu.length>0? <PageListMenu listMenu={listMenu}/> :
         <InfoChargement message={"Loading"} loading={loading}/>
          }
         </Fragment>
        
  )
}
export default ListMenu
