declare namespace base {
  interface resp<T> {
    code: number;
    message: string;
    data?: T;
  }
}

export default base;
