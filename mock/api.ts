export default {
  'POST /api/auth/login': (req: any, res: any) => {
    const data: { userName: string; password: string } = req.query;
    console.log('POST /api/login', data);
    setTimeout(() => {
      const d = { token: 'test token' };
      if (data.userName === 'yuansong' && data.password === 'yuansong') {
        res.json({
          code: '0000',
          message: 'success',
          data: d,
        });
      } else {
        res.json({
          code: '0001',
          message: 'username or password error',
        });
      }
    }, 3000);
  },
};
