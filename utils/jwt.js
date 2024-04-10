const crypto = require('crypto');

// Function to create a JWT token
exports.createJWT=(payload, secret, options = {})=> {
    return new Promise((resolve, reject)=>{
        try {
            // Create a header with the algorithm and type
            const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');

            // Create a payload and encode it
            const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');

            // Create a signature
            const signature = crypto.createHmac('sha256', secret)
                                    .update(`${header}.${payloadBase64}`)
                                    .digest('base64');

            // Concatenate the header, payload, and signature with dots
            const token = `${header}.${payloadBase64}.${signature}`;
            resolve(token);
        } catch (error) {
            reject(error);
        }
    

    
})
}

// Function to verify a JWT token
exports.verifyJWT=(token, secret)=> {
    return new Promise((resolve, reject)=>{
        try {
            // Split the token into its parts: header, payload, and signature
            const [headerBase64, payloadBase64, signature] = token.split('.');

            // Recreate the signature using the header and payload
            const recreatedSignature = crypto.createHmac('sha256', secret)
                                            .update(`${headerBase64}.${payloadBase64}`)
                                            .digest('base64');

            // Compare the recreated signature with the provided signature
            if (signature !== recreatedSignature) {
                throw new Error('Invalid signature');
            }

            // Decode the payload from base64
            const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
            resolve(payload);
        } catch (error) {
            reject(error)
        }
    })

}


