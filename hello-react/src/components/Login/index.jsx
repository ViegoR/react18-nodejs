import React from 'react'
import  './index.scss'
import http from '.././../util/ajax'
import { useNavigate } from "react-router-dom";
import { Button,Input,Form,message } from 'antd'
import { UserOutlined,LockOutlined } from '@ant-design/icons';


export default function Login() {
  const [loginForm] = Form.useForm();
  const navigate=useNavigate()
  const onFinish= async(obj)=>{
    let results= await http("post","/login",obj)
    if(results.status===200){
      let saveObj=JSON.stringify({username:obj.username,usertoken:results.token})
      localStorage.setItem("userTokenInfo",saveObj)
      message.success('登录成功！')
      navigate("/home")
    }else{
      console.log("出错了onFinish");
    }
  }
  
  return (
    <div className='login'>
        <div className='login-card'>
            <h2>登录</h2>
            <Form
            form={loginForm}
            name="userInfo"
            onFinish={onFinish}
            >
              <Form.Item name="username">
                <Input size="large"  placeholder="请输入用户名" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item name="password">
                <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit" >
                    Primary
                 </Button>
              </Form.Item>
            </Form>

            
              
        </div>
    </div>
  )
}
