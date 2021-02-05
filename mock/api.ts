export default {
  'POST /api/auth/login': (req: any, res: any) => {
    const data = req.body;
    console.log('POST /api/login4', data);
    setTimeout(() => {
      const d = {
        token:
          'CD0IBVoD2S0TtmU6AvHRtoqx8jEPLBoBGTkdLSkPPSc1HGFge150IiQJMn5/X2xyakR5Z3VZeGR8TWhvaUhhYXlKJQ==',
        id: new Date().getTime(),
        expire: new Date().getTime() + 1000 * 60 * 60 * 2,
      };
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
  'POST /api/auth/check': (req: any, res: any) => {
    const data = req.body;
    console.log('POST /api/auth/tokenCheck', data);
    setTimeout(() => {
      if (
        data.token &&
        data.token ===
          'CD0IBVoD2S0TtmU6AvHRtoqx8jEPLBoBGTkdLSkPPSc1HGFge150IiQJMn5/X2xyakR5Z3VZeGR8TWhvaUhhYXlKJQ=='
      ) {
        res.json({
          code: 0,
          message: 'success',
          data: {
            token:
              'CD0IBVoD2S0TtmU6AvHRtoqx8jEPLBoBGTkdLSkPPSc1HGFge150IiQJMn5/X2xyakR5Z3VZeGR8TWhvaUhhYXlKJQ==',
            id: new Date().getTime(),
            expire: new Date().getTime() + 1000 * 60 * 60 * 2,
          },
        });
      }
    }, 3000);
  },
};
