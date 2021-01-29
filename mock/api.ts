export default {
  'POST /api/auth/login': (req: any, res: any) => {
    const data: { userName: string; password: string } = req.body;
    console.log('POST /api/login', data);
    setTimeout(() => {
      const d = { token: 'test token' };
      res.json({
        code: '0000',
        message: 'success',
        data: d,
      });
    }, 3000);
  },
};
