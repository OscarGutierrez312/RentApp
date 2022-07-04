/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
		loader: "imgix",
		path: "https://ik.imagekit.io/vyozzdj0v",
		domains:['lh3.googleusercontent.com'],
	},
}

module.exports = nextConfig
