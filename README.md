# s3-workers-js
A caching/server-side URL rewriting system for S3 services using Cloudflare Workers!

## Setup
1) Set `bucketHost` in `index.js` to the host for your bucket.
2) Deploy to a CloudFlare worker.
3) Enjoy!

## Caveats
Due to how AWS4 works, you cannot do administrative actions using this worker. Therefore, I have restricted it to GET requests only and Headers are erased during the request. This isn't a big deal since this worker is really designed for making a neat URL for your users. Your CI can go directly to your S3 provider.
