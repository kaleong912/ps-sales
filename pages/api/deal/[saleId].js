export default async function handler(req, res) {
    const { saleId } = req.query
    if(req.method == "GET" ){
        
        const results = await fetch( process.env.API_HOST+'api.php?key='+process.env.API_KEY+'&region=HK&sale=' + saleId)
        const json = await results.json()
        res.status(400).json({
            data: json
        })

    }
    else{
        res.status(403).json({ error: 'Method error'})
    }

}
