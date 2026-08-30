import HomeRepository from "../home/repository.js"
class HomeController {
    async principalsThought(req, res) {
        try {
            const { name, thought } = req.body
            const file=req.file.buffer
            const response=await HomeRepository.principalsThoughtData({name,thought,file})
            return res.status(200).json({success:true,message:"Thought upload sucessfuly",data:response})
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }

    }
    async getprincipalThought(req,res){
        try{
            const response=await HomeRepository.getPrincipalThought()
            return res.status(200).json({success:true,data:response})
        }
        catch(err){
            return res.status(400).json({success:false,message:err.message})
        }

    }
}

export default new HomeController()