declare namespace baseReq {
  interface resp<T> {
    code: string;
    message: string;
    data?: T;
  }
}

export default baseReq;
