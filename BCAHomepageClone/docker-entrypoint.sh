#!/bin/bash

echo "Starting HomeCloneApp App"
npm run start
echo $?
tail -f /dev/null
