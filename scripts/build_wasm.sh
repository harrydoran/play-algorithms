#!/bin/bash

set -e

cd "$(dirname "$0")/../go/algorithms"

GOOS=js GOARCH=wasm go build -o ../public/main.wasm .

echo "WebAssembly module built successfully!"
