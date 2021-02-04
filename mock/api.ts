export default {
  'POST /api/auth/login': (req: any, res: any) => {
    const data = req.body;
    console.log('POST /api/login', data);
    setTimeout(() => {
      const d = { token: 'test token' };
      if (data.username === 'yuansong' && data.password === 'yuansong') {
        res.json({
          code: 0,
          message: 'success',
          data: d,
        });
      } else {
        res.json({
          code: 10001,
          message: 'username or password error',
        });
      }
    }, 1000);
  },
};
