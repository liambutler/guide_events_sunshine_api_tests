#! /bin/bash
RED='\033[0;31m'
NC='\033[0m'

duration="${TIMEOUT_AFTER_SECONDS:-600}" # default to 10 mins

timeout $duration npm run cy:run

exit_status=$?
if [[ $exit_status -eq 124 ]]; then
    printf "\n\n"
    printf "${RED}TIMEOUT ERROR${NC}\n"
    printf "Cypress tests were running for more than ${duration} seconds.\n"
    printf "Configure max duration via the \$TIMEOUT_AFTER_SECONDS env var.\n"
    printf "${RED}==============${NC}\n\n"
fi

exit $exit_status
