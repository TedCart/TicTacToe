#!/bin/sh

# sh scripts/examples/update.sh
curl "https://ga-library-api.herokuapp.com/examples/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "example": {
      "text": "'"${TEXT}"'"
    }
  }'
