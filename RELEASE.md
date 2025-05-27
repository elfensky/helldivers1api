## 0.4.3 (2025-05-21)

TODO

- implement more thoughtful updating for rebroadcast
- store normalized data alongside raw.
- GET /api/h1/attack/[season]
- GET /api/h1/defend/[season]
- GET /api/h1/statistics/[season]

## 0.4.2 (2025-05-21)

- migrate openapi generation to instrumentation.js -> npm run build removes all comments from the code, so it cannot be generated live.

## 0.4.1 (2025-05-20)

- create `/api/openapi` route.js that uses swagger-jsdoc and the JSDoc comments in `/api/h1/\*\*/\*.js` to generate an OpenAPI spec.
- create `/docs` page.jsx that uses swagger-ui-dist to render the OpenAPI spec.

## 0.4.0 (2025-05-20)

- implement Prisma Models for helldivers1 data
- POST /api/h1/rebroadcast
    - get_campaign_status
    - get_snapshots
- updateStatus.mjs
- updateSnapshot.mjs
- validate works in docker
