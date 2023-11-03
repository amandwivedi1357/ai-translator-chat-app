/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental : {
        serverActions:true,
    },
    images:{
        domains:["github.com","images.pexels.com","unsplash.com","lh3.googleusercontent.com"]
    }
}

module.exports = nextConfig
