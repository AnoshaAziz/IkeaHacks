# Ikea Hacks

## How to run project

- Go to `Startup/Db.js` file and change connection string of mongodb (in my case it is `mongodb://localhost:27017/IkeaHacksDb`)
- Run `npm i`
- Run `npm run start`

## Testing

Postman collection `Hacks.postman_collection.json` is added in repo. You can use that for testing.

- `Create User` and then use `User Authentication` request to get token.
-  Use that token in a custom header `x-new-token` of each request of hacks folder. 
