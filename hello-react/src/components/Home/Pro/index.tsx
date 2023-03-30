import {useEffect,useState} from 'react'
import  './index.scss'
import http from '../../../util/ajax'
//import { useNavigate } from "react-router-dom";
import {Button,Table,Image } from 'antd'
import AddProCom from './AddProCom.tsx'
export default function Pro() {
  const { Column } = Table;
  useEffect(()=>{
    handleGetProList()
  },[])
  
  interface DataType {
    key: number;
    name: string;
    img: string;
  }
  const [data, setData] = useState<DataType[]>([]);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const handleGetProList:object=async ()=>{
    const sendObj= JSON.parse(localStorage.getItem("userTokenInfo"))
    const result=await http("post","/home/pro",{...sendObj})
    let showList=result.dataList
    for (let index = 0; index < showList.length; index++) {
      showList[index].img=JSON.parse(showList[index].img)
      
    }
    setData(showList)
  }
  const addPro=()=>{
    setShowAdd(true)
  }
  const closeAddPro=()=>{
    setShowAdd(false)
  }
  return (
    <>
      <Button type='primary' onClick={addPro}>添加</Button>
      <Table dataSource={data}>
        <Column title="序号" dataIndex="key" key="key" />
        <Column title="品牌名称" dataIndex="name" key="name"  />
        <Column title="品牌logo" dataIndex="img" key="img"
          render={(img:string[])=>(
            <Image width={80} src={img} className="logoImg" alt='logo'/>
          )}
        />
        <Column title="操作" dataIndex="img" key="img"
          render={()=>(
            <>
              <Button type='default' >修改</Button>
              <Button type='primary'>删除</Button>
            </>
          )}
        />
      </Table>
      <AddProCom showAdd={showAdd} closeAddPro={closeAddPro}></AddProCom>
    </>
  )
}
