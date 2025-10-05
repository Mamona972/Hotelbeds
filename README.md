# Hotelbeds

this is small Node.js app by using  a single HTTP endpoint that returns hotels for a given destination code by calling the Hotelbeds Test API.
It handles Hotelbeds authentication (Api-Key + timestamp-based SHA256 X-Signature), sends a search request, and returns a simplified hotel list to the caller.

## Features 

Accepts a destinationCode query (e.g. LON, BCN, NYC)

Builds the Hotelbeds search request (stay + occupancies + destination)

Generates X-Signature = SHA256(API_KEY + SECRET + TIMESTAMP) for each request

Calls Hotelbeds sandbox /hotel-api/1.0/hotels and returns the resulting hotel data

