import axios from 'axios'



  const http=(method,apiUrl,sendObj)=>{
    return axios[method](`http://127.0.0.1:8080/api${apiUrl}`,{...sendObj}).then((res)=>{
       
       return res.data

      }).catch(function (error) {
       console.log(error);
       return error
        })
  }
  
  
  
 

export default http