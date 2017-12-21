#!/bin/sh

# sh scripts/examples/destroy.sh
curl "https://ga-library-api.herokuapp.com/examples/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"
