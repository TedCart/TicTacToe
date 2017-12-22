#!/bin/sh

# sh scripts/examples/destroy.sh

curl --include --request DELETE "https://ga-library-api.herokuapp.com/examples/${ID}" \
  --header "Authorization: Token token=${TOKEN}"

echo
