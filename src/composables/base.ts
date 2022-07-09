let base_url: string;

if (import.meta.env.DEV) {
	base_url = "http://localhost:8000";
} else {
	base_url = window.location.protocol + "//" + window.location.host;
}



export { base_url };
