#!/bin/sh

# sh scripts/getGame.sh

curl --include --request GET "http://tic-tac-toe.wdibos.com/games/${ID}" \
  --header "Authorization: Token token=${TOKEN}"

echo
