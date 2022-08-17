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
        await getFundraisers(constituents)
    } catch (error) {
        console.log(error)
    }

}

async function getFundraisers(constituents) {
    try {
        const fundraisers = []
        for (i = 0; i < constituents.length; i++) {
            const response = await axios.get(
                `https://api.sky.blackbaud.com/constituent/v1/constituents/${constituents[i].id}/fundraiserassignments`,
                {
                    headers: {
                        'Bb-Api-Subscription-Key': process.env.AUTH_SUBSCRIPTION_KEY,
                        'Authorization': `Bearer ${process.env.TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(response.data.value.length!=0){
                fundraisers.push(response.data.value[0])
            }
        }
        console.log(fundraisers)
    } catch (error) {
        console.log(error)
    }

}

getConstituents()