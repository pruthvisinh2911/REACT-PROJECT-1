
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import { enhancedImageAPI } from '../utils/enhancedImageApi'
import { useState } from 'react'


const Home = () => {

  const [uploadImage , setUploadImage] = useState(null);
  const [EnhancedImage , setEnhancedImage] = useState(null);
  const [loading , setloading] = useState(false);

  const UploadImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file))
    setloading(true)
    //calling api to enhanced image
      try {
        const enhancedURL = await enhancedImageAPI(file);
        setEnhancedImage(enhancedURL)
        setloading(false)
      }
      catch (error)
      {
          console.log(error)
      }
  }


  return (
    <>
      <ImageUpload UploadImageHandler={UploadImageHandler}/>
      <ImagePreview loading={loading} uploaded={uploadImage}
      enhanced={EnhancedImage?.image}
      />
    </>
  )
}

export default Home
