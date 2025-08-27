import express from "express"




const port = process.env.PORT || 3000
const app = express()

app.get('/api/response',(req ,res)=>{
    const respose  = [
        {
            id: 1,
            content: "first post"

        },
        {
            id: 2,
            content: "second post"
        }
    ]
    res.json(respose)
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}` )
})
