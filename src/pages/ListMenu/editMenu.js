import React , {useState,useContext} from 'react'
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/SaveAlt';
import IconButton from '@material-ui/core/IconButton';
import { FirebaseContext } from 'components/Firebase';




const EditMenu = ({id,name,position}) => {

    const {queryOneMenu} = useContext(FirebaseContext);

    const [valueName, setValueName] = useState(name);

    const [valuePosition, setValuePosition] = useState(position);

    const save = () => {
        //console.log("save",valueName,valuePosition);
        queryOneMenu(id).update({ name:valueName,position:parseInt(valuePosition)});
    }
    
    const onChangeName = (e) => {
        //console.log(e.target.value);
        (e.target.value != undefined) && setValueName(e.target.value);
    }
    
    const onChangePosition = (e) => {
        //console.log(e.target.value);
        (e.target.value != undefined) && setValuePosition(e.target.value);
    }


    return (
        <div>

            <TextField 
            id="name" 
            label="Nom du menu" 
            variant="outlined" 
            defaultValue={name}
            onChange={onChangeName}
            />

            <TextField 
            id="position" 
            label="Position du menu" 
            variant="outlined" 
            defaultValue={position} 
            type="number"
            onChange={onChangePosition}
            />

            <IconButton onClick={save} >
                <SaveIcon/>
            </IconButton>

        </div>
    )
}

export default EditMenu
