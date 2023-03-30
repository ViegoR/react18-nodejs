import {useEffect,useState} from 'react'
import  './index.scss'
import http from '../../util/ajax'
import { useNavigate } from "react-router-dom";
import { Menu ,Button,Modal} from 'antd'
import Pro from './Pro/index.tsx'
import {Route,Routes} from 'react-router-dom'

export default function Home() {
   const navigate=useNavigate()
  const handGetMenu=async()=>{
    const sendObj= JSON.parse(localStorage.getItem("userTokenInfo"))
      let results = await http("post","/home/menu",{...sendObj})
      if(results.status===200){
        setItems(JSON.parse(results.resList))
      }
  }
  
  
  useEffect(()=>{
    handGetMenu()
  },[])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [topTitle, settopTitle] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const logout=()=>{
    setIsModalOpen(false);
    localStorage.removeItem("userTokenInfo")
    navigate("/",{replace:true})
  }
  const clickMenu=(e)=>{
    settopTitle("")
    let titleList = e.keyPath.reverse()
    let endTitle=computMenu(titleList,items,0)
    settopTitle(endTitle)
  }
  const computMenu=(list,arr,len)=>{
      let save=""
      for (let i = 0; i < arr.length; i++) {
        if(list[len]===arr[i].key){
          save="/"+arr[i].label;
          if(arr[i].children&&len<list.length){
            let save2= computMenu(list,arr[i].children,len*1+1)
             save=save+""+save2
          }else{
            navigate(arr[i].path)
          }
          return save 
        }
        
      }
  }
  return (
    <div className='home'>
        <div className='leftNav'>
          <Menu
          onClick={clickMenu}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['2']}
          mode="inline"
          theme="dark"
          items={items}
        />
        </div>
        <div className='rightNav'>
          <div className='topNav'>
              {topTitle}
              <Button type='primary' onClick={showModal}>退出登录</Button>
              <Modal title="温馨提示" open={isModalOpen} onOk={logout} onCancel={handleCancel}>
                <p>是否要退出登录？</p>
              </Modal>
          </div>
          <div className='mainRouter'>
            <Routes>
              <Route element={<Pro/>} path="/pro"></Route>
            </Routes>
          </div>
        </div>
    </div>
  )
}
