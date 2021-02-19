enum responseCode {
  SUCCESS = 0, //成功
  AUTH_ERROR = 10001, //用户名或密码错误
  AUTH_EXPIRE = 10002, //登录已过期
}

export default responseCode;
