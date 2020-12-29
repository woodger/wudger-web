#!/bin/bash

if [[ -x "$(command -v update-ca-certificates)" ]]; then
  update-ca-certificates
fi

yarn start -p 3000
