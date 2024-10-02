export const getServerUrl = (path?: string) => {
	return process.env.NODE_ENV === 'production'
		? `https://api.example.com${path}`
		: `http://localhost:4200${path}`
}
