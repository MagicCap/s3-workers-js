// The bucket host.
const bucketHost = "magiccap-s3.sfo2.digitaloceanspaces.com"

// Listens for events and handles them.
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event))
})

// Handles the request.
async function handleRequest(event) {
  const cache = caches.default
  const url = new URL(event.request.url)
  url.host = bucketHost
  const method = event.request.method
  if (method === "GET") {
    const cacheRequest = new Request(event.request.url, {method: "GET"})
    const cacheMatch = await cache.match(cacheRequest)
    if (cacheMatch) {
      return cacheMatch
    }
    const fetchedContent = await fetch(url)
    const response = new Response(fetchedContent.body, {
      status: fetchedContent.status,
      statusText: fetchedContent.statusText,
      headers: fetchedContent.headers,
    })
    event.waitUntil(cache.put(cacheRequest, response.clone()))
    return response
  } else {
    return new Response("Method not allowed.", {status: 405})
  }
}
