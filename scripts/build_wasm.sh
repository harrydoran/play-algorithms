#!/bin/bash

# Ensure TinyGo is installed
if ! command -v tinygo >/dev/null 2>&1; then
    echo "TinyGo is not installed. Please install it before continuing."
    exit 1
fi

cd go

# Build the WebAssembly module using TinyGo
tinygo build -o ../static/main.wasm -target wasm ./algorithms

cp "$(tinygo env TINYGOROOT)/targets/wasm_exec.js" ../static/

echo "TinyGoWebAssembly build completed successfully."
