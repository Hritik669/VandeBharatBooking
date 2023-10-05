import * as redis from 'redis';

async function createRedisClient() {
    const client = await redis.createClient();
    await client.connect();
    return client;
}

export async function maintainSession(user, device) {
    try {
        const client = await createRedisClient();
        
        if (user) {
            await client.SET(user.id, JSON.stringify({
                'user_id': user._id,
                'device_id': device,
                'status': true
            }));
            
            const redisSession = await client.GET(user.id);
            console.log(redisSession);
        } else {
            console.log('User not found');
        }
    } catch (err) {
        console.log('Redis not set successfully', err);
    }
}

export async function logout_session_redis(user) {
    console.log(user.email);
    try {
        const client = await createRedisClient();
        console.log(user.username);
        
        await client.del(user.email);
        console.log("Delete successfully");
    } catch (err) {
        console.log("Error in deleting", err);
    }
}

export async function get_otp(email) {
    const client = await createRedisClient();
    const otpDetails = await client.get(email);
    console.log('----', otpDetails);
    const userOTP = JSON.parse(otpDetails);
    return otpDetails;
}

export async function del_otp(email) {
    const client = await createRedisClient();
    const otpDetails = await client.del(email);
    return otpDetails;
}
