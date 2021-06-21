import React, { useContext} from 'react';
import App from 'base-shell/lib';
import MUIConfig from 'material-ui-shell/lib';
import merge from 'base-shell/lib/utils/config';
import _config from './config';
// meme principe que firebase , mais pour consommer le store
import store from 'redux/store';
import { FirebaseContext } from 'components/Firebase';
import { changeMenu,affLoadingMenu } from 'redux/actions/menu';
import menu from 'redux/reducers/menu';
import { useDispatch } from 'react-redux';

const config = merge(MUIConfig, _config);

const initMenu = (queryMenus,dispatch ) => {
  
  dispatch(affLoadingMenu(true));

  queryMenus().onSnapshot(snapshot => {

    let tempListMenu = [];

    !snapshot.empty && snapshot.forEach(item => {

      //console.log(snapshot)

      tempListMenu.push({id:item.id, ...item.data()})

    })

    console.log("TEMP LIST MENU",tempListMenu);

    //const dispatchMenu = useDispatch();

    // action qui va dispatcher les modifications du menu

    //dispatchLoading(loadingMenus(false));
    
    dispatch(changeMenu(tempListMenu));

    dispatch(affLoadingMenu(false));
    

  })

}

const Demo = () => {

    const {queryMenus} = useContext(FirebaseContext);

    const dispatch = useDispatch();

    //console.log(queryMenus);

    React.useEffect(() => {

      initMenu(queryMenus,dispatch);

    })
       
    return (
        <App config={config} />
    )

  }

export default Demo;