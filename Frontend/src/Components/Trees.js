import React,{useEffect} from 'react'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeView} from '@material-ui/lab';
import TreeItem from '@material-ui/lab/TreeItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import './trees.css'

const trees =  ({data,getdata,showstudent,getclasses,set_selected_section_in_tree,buttons_on}) => {

    const hideorshowTreeView = ()=>{
        const treeView = document.getElementById('TreeView');
        if(treeView.style.marginLeft === '0px'){
            treeView.style.marginLeft = '-400px';
        }
        else{
            treeView.style.marginLeft = '0px';
        }
    }
  return (
    <div className='tree'>
        <Button className='showhide' type='button' color='primary' size="larger" startIcon={<FolderOpenIcon />} onClick={hideorshowTreeView}>Classes</Button>
    <div  id='TreeView' className='tree_container'>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ArrowForwardIosIcon/>}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
  {data.map((item, index) => {
    return (<TreeItem nodeId={index} label={item.ClassName}>
        {item.sections.map((section, index) => {return (<TreeItem nodeId={index} label={section.SectionName} onClick={()=>{showstudent(section.id);set_selected_section_in_tree(section.id); getclasses();buttons_on(true)}}/>)})}
  </TreeItem>)})}
</TreeView>
    </div>
    </div>
  )
}

export default trees