require('dotenv').config()
const axios = require('axios');

async function getConstituents() {
    try {
        const constituents = []
        const response = await axios.get(
            `https://api.sky.blackbaud.com/constituent/v1/constituents?limit=10`,
            {
                headers: {
                    'Bb-Api-Subscription-Key': process.env.AUTH_SUBSCRIPTION_KEY,
                    'Authorization': `Bearer ${process.env.TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        response.data.value.forEach(cons => constituents.push(cons))
        console.log(constituents)
    } catch (error) {
        console.log(error)
    }

}

getConstituents()
