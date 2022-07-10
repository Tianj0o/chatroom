const baseUrl = "http://localhost:8888";

export default function request(url: string, initConfig: RequestInit = {}) {
  const requestUrl = baseUrl + url;
  console.log(requestUrl, "+++++");
  return fetch(requestUrl, initConfig).then((res) => res.json());
}
