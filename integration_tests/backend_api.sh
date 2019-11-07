#!/usr/bin/env bash

set -e

ERRORS=0
echo "Testing /insert endpoint"
curl -X PUT http://localhost:8000/insert -d "{\"english\":\"hello\",\"hebrew\":\"world\"}"

#if [ 0 -eq $? ]; then
#    ERRORS=$((ERRORS+1))
#fi

#
#if [ 0 -eq $ERRORS ]; then
#    echo "Exiting with $ERRORS errors"
#    exit 1
#fi

