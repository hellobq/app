const { Verification } = require('../db/Schema');
const randomCode = require('../util/randomCode');

const verification = async (ctx, next) => {
  let rCode = randomCode(), continueDate = 10;

  const { _id } = await Verification.create({
    code: rCode
  });

  setTimeout(
    async () => {
      await Verification.deleteOne({
        _id
      })
    },
    continueDate * 1000
  );

  ctx.body = {
    randomCode: rCode,
    continueDate
  };
};

module.exports = verification;
