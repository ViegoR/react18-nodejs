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
  const [showAdd, setShowAdd] = useState<number>(0);
  const [recordData, setRecordData] = useState<object>();

  const handleGetProList:object=async ()=>{
    const sendObj= JSON.parse(localStorage.getItem("userTokenInfo"))
    const result=await http("post","/home/pro",{...sendObj})
    let showList=result.dataList
    for (let index = 0; index < showList.length; index++) {
      showList[index].img=JSON.parse(showList[index].img)
      
    }
    setData(showList)
  }
  const refreshPage=()=>{
    handleGetProList()
  }
  const addPro=()=>{
    //setRecordData()
    setShowAdd(1)
  }
  const changePro=(text,record)=>{
    return()=>{
      
      setShowAdd(text)
      setRecordData(record)
    }
  }
  const closeAddPro=()=>{
    setShowAdd(0)
    setRecordData({})

  }
  return (
    <>
      <Button type='primary' onClick={addPro}>添加</Button>
      <Table dataSource={data}>
        <Column title="序号" dataIndex="key" />
        <Column title="品牌名称" dataIndex="name"  />
        <Column title="品牌logo" dataIndex="img" 
          render={(img:string[])=>(
            <Image width={80} src={img} className="logoImg" alt='logo'/>
          )}
        />
        <Column title="操作" dataIndex="key" 
          render={(text,record)=>(
            <>
              <Button type='default' onClick={changePro(text,record)}>修改</Button>
              <Button type='primary'>删除</Button>
            </>
          )}
        />
      </Table>
       <AddProCom showAdd={showAdd} recordData={recordData} closeAddPro={closeAddPro} refreshPage={refreshPage}></AddProCom>
      
    </>
  )
}
