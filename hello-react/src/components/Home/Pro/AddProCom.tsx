import {useState,useEffect} from 'react'
import {Button,Drawer,Form, Input,Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import http from '../../../util/ajax'

const getBase64 = (img: RcFile, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
export default function AddProCom(props) {
    const {showAdd,closeAddPro,refreshPage,recordData}=props
    const onClose = () => {
      
      
      closeAddPro();
    };
    const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [addForm] = Form.useForm();
  useEffect(()=>{
    if(recordData){
      setImageUrl(recordData.img);
      addForm.setFieldValue("name",recordData.name)
      addForm.setFieldValue("img",recordData.img)
      
    }
    
  },[recordData])
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        addForm.setFieldValue("img",url)
      });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onFinish=async (obj)=>{
    let sendObj={
      name:obj.name,
      img:JSON.stringify(obj.img)
    }
    console.log(sendObj);
    
    // let result = await http("post","/home/addpro",{...sendObj})
    // if(result.status=="200"){
    //   closeAddPro(false)
    //   refreshPage()
      
    // }
    
  }
        if(!showAdd) return null
        return (
            <> 
              <Drawer
                  title="新增品牌"
                  width={720}
                  onClose={onClose}
                  bodyStyle={{ paddingBottom: 80 }}
                  open={showAdd}
                >
                  <Form layout="vertical" hideRequiredMark onFinish={onFinish} form={addForm}>
                  <Form.Item
                    name="name"
                    label="品牌名称"
                    rules={[{ required: true, message: '请输入品牌名称' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      placeholder="请输入品牌名称"
                    />
                  </Form.Item>
                  <Form.Item
                    name="img"
                    label="图片"
                    rules={[{ required: true, message: '请上传图片' }]}
                    valuePropName="file"
                    //getValueFromEvent={normFile}
                  >
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                  </Form.Item>
                  <Form.Item
                  >
                    <Button type="primary" htmlType="submit">提交</Button>
                  </Form.Item>
                  </Form>
                  </Drawer>
            </>
          )
    

  
}
