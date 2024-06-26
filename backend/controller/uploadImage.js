import  File from '../models/file.js'


export  const uploadImage = async(request, response) =>{
   const fileObj = {
    path : request.file.path,
    name : request.file.originalname
   }    
        try {   
            const  file = await File.create(fileObj)
            console.log(file)
            response.status(200).json({path: `https://file-sharing-application-one.vercel.app/file/${file._id}`})
            console.log(file)
            
        } catch (error) {
            console.log(error)
            response.status(500).json({error: error.message})
            
        }
}

export const downloadImage = async(request, response) =>{
    try {
        const file = await File.findById(request.params.fileId)
        file.downloadContent++
        await file.save()
        
        response.download(file.path, file.name)
    } catch (error) {
            console.error(response.error)
            response.status(500).json({error: error.message})
    }

}