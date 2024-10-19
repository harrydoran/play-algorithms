//go:build js && wasm
// +build js,wasm

package main

import "syscall/js"

func fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}

func fibonacciWrapper() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) != 1 {
			return "Invalid number of arguments passed"
		}
		n := args[0].Int()
		result := fibonacci(n)
		return result
	})
}
