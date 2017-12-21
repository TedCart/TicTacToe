#!/bin/bash

# ID=2 sh scripts/sign-out.sh

curl --include --request DELETE "https://ga-library-api.herokuapp.com/sign-out/$ID" \
    --header "Authorization: Token token=$TOKEN"



echo
