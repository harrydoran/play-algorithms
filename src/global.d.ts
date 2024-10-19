declare global {
  interface Window {
    Go: any;
    fibonacciGo: (n: number) => number;
  }
}

export {};
