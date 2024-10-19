//go:build js && wasm
// +build js,wasm

package main

import "syscall/js"

func main() {
	js.Global().Set("fibonacciGo", fibonacciWrapper())
	<-make(chan bool)
}
