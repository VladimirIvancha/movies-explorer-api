const errorstatuses = {
  ok: 200,
  created: 201,
  BadReqErrMessage: 'Переданы некорректные данные',
  NotFoundUserErrMessage: 'Пользователь не найден',
  NotFoundPageErrMessage: 'Страница не найдена',
  ConflictErrMessage: 'Пользователь с таким Email уже существует',
  UnAuthorizedErrMessage: 'Неверный email или пароль',
  NeedAuthorizeErrMessage: 'Необходима авторизация',
  WrongURLFormatMessage: 'Неправильный формат ссылки',
};

module.exports = errorstatuses;
