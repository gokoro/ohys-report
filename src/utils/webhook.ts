const endpoint = import.meta.env.VITE_WEBHOOK_URL

interface WebhookField {
  name: string
  value: string
}

export function sendEmbeds(fields: WebhookField[]) {
  const fetcher = createFetcher()

  return fetcher(endpoint, {
    embeds: [
      {
        title: 'Ohys Report',
        fields,
      },
    ],
  })
}

function createFetcher() {
  return (url: string, body: object) =>
    fetch(url, {
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
    })
}
