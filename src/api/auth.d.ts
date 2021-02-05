declare namespace authDef {
  interface authLoginReq {
    username: string;
    password: string;
  }

  interface authCheckReq {
    token: string;
  }

  interface authLoginResp {
    token: string;
    expire: number;
    id: number;
  }
}

export default authDef;
