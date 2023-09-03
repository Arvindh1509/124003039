const { default: axios } = require('axios');
const express = require('express');
const app = express()
const port = 3000

app.get('/numbers', async (req, res) => {
    try{
        const url=req.query;
        const urls=Array.isArray(url)?url:[url];

        const promises= urls.map(async(url)=>{
            try{
                // console.log('<<>>',url);
                const instance=axios.create();
                instance.defaults.baseURL={url}

                const response=await instance
                .get('',{setTimeout:500});
                if(response.data && Array.isArray(response.data.numbers)){
                    return response.data.numbers;
                }
            }
            catch(error){
                console.error(error);
            }
            return [];
        })

        const results=await Promise.all(promises)

        const mergedN=Array.from(new Set(results.flat())).sort((a,b)=>a-b);

        res.json({numbers:mergedN})
    }
    catch(error){
        console.error(error);
    }
    // res.send('Hello World!')
    
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))