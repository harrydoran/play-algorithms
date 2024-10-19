#!/bin/bash

set -e

cd go

GOOS=js GOARCH=wasm go build -o ../static/main.wasm algorithms/main.go algorithms/fibonacci.go

cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" ../static/

echo "WebAssembly module built successfully!"
