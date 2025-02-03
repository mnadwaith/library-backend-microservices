import redis from 'redis'

const client = redis.createClient({
    url: process.env.REDIS_URL
})

client.on('error', (error) => {
    console.log('Error ' + error.message)
})

await client.connect()

export default client