import Loading from "./Loading"

const ImagePreview = (props) => {
console.log(props)
  return (
    <div className="mt-8 grid gird-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl ">

      {/* original Image*/}

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
          Original Image 
        </h2>

        { props.uploaded ?  <img src={props.uploaded} alt="" className="w-full h-full object-cover" /> :
        
        <div className="flex items-center justify-center h-100 bg-gray-200 ">No Image Selected</div>
         }
         </div>
       
        

       {/* Enhanced  Image*/}

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
          Enhanced  Image 
        </h2>

        {props.enhanced &&  ! props.loading &&  <img src={props.enhanced} alt="" className="w-full h-full object-cover" /> }

        {props.loading ? <Loading /> :  <div className="flex items-center justify-center h-100 bg-gray-200 ">No Enhanced-Image  </div>}
        
      
      </div>
    </div>
  )
}

export default ImagePreview
