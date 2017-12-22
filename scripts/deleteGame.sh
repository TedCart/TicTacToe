#!/bin/sh

# sh scripts/deleteGame.sh

curl --include --request DELETE "http://tic-tac-toe.wdibos.com/games/${ID}" \
  --header "Authorization: Token token=${TOKEN}"

echo
