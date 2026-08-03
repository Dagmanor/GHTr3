const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

export const buildApiUrl = (resource) => `${getApiBaseUrl()}/api/${resource}/`;

const normalizePayload = (payload, fallbackKey) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload[fallbackKey])) {
    return payload[fallbackKey];
  }

  if (payload.data && typeof payload.data === 'object' && Array.isArray(payload.data.items)) {
    return payload.data.items;
  }

  if (payload.results && typeof payload.results === 'object' && Array.isArray(payload.results.items)) {
    return payload.results.items;
  }

  return [];
};

export const fetchJson = async (resource, fallbackKey) => {
  const response = await fetch(buildApiUrl(resource), {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  const payload = await response.json();
  return normalizePayload(payload, fallbackKey);
};
