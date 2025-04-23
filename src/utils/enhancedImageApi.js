import axios from "axios";

const API_KEY = "wx2nszegw1ellj2dh"
const BASE_URL= "https://techhk.aoscdn.com/";

 export const enhancedImageAPI = async(file) =>{
    //code to call api and enhanced image api 
    try{
          const TaskId = await uploadImage(file);
          console.log("image upload sucessfully" , TaskId)  

         const enhancedImageData = await fetchEnhancedImage(TaskId);


        console.log(enhancedImageData) 

        return enhancedImageData
    } 
    catch(error)    
    {
        console.log("error hai bhai" ,error.message)
    }

}

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file);

    const { data } = await axios.post(`${BASE_URL}/api/tasks/visual/scale`, 
        formData,
         { 
            headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
}, });

    if(!data?.data?.task_id)
    {
        throw new error("failed to upload image , Taskid not found")
    }
    
    return data.data.task_id;
  
};

const fetchEnhancedImage = async (TaskId) =>{
    const { data } = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${TaskId}`, 
         { 
            headers: {
        "X-API-KEY": API_KEY,
}, });

if(!data?.data)
    {
        throw new error("failed to upload image , Taskid not found")
    }
    return data.data
}

const pollForEnhancedImage = async (TaskId , retries = 0) =>
    {
        const result =  await fetchEnhancedImage(TaskId)

        if(result.state === 4)
        {
            console.log("processing...");

            if(retries >=20)
                {
                    throw new error("maximum tries reached try again later")
                }
                await new Promise((resolve) => setTimeout(resolve,2000))

        return pollForEnhancedImage(TaskId , retries + 1)
        }
        

        console.log("enhanced image URL",result)
        return result;
    } 