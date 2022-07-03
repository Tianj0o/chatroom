interface fetchConfig {
  url: string;
  data?: BodyInit;
}
export default function request(config: fetchConfig) {
  const { url, data } = config;

  return fetch(url).then((res) => res.json());
}
