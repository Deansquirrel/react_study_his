declare namespace authDef {
  interface authLoginReq {
    username: string;
    password: string;
  }

  interface authLoginResp {
    token: string;
  }
}

export default authDef;
