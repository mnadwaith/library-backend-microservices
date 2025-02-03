import redis from 'redis'

const client = redis.createClient()

client.on('error', (error) => {
    console.log(error.message)
})

client.connect()

export default client