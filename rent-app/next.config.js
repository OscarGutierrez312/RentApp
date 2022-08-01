/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
		loader: "imgix",
		domains:['lh3.googleusercontent.com'],
		path: "https://ik.imagekit.io/servEasyCar"		
	},
	
}

module.exports = nextConfig
