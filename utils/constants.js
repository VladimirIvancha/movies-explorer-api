const constants = {
  OK_STATUS: 200,
  CREATED_STATUS: 201,
  BAD_REQUEST_STATUS: 400,
  NOT_AUTH_STATUS: 401,
  FORBIDDEN_STATUS: 403,
  NOT_FOUND_STATUS: 404,
  CONFLICT_STATUS: 409,
  DEFAULT_ERROR_STATUS: 500,
  BAD_REQ_ERR_MSG: 'Переданы некорректные данные',
  NOT_FOUND_MOVIE_ERR_MSG: 'Карточка не найдена',
  NOT_FOUND_USER_ERR_MSG: 'Пользователь не найден',
  NOT_FOUND_PAGE_ERR_MSG: 'Страница не найдена',
  CONFLICT_ERR_MSG: 'Пользователь с таким Email уже существует',
  UNAUTHORIZED_ERR_MSG: 'Неверный email или пароль',
  NEED_AUTH_ERR_MSG: 'Необходима авторизация',
  FORBIDDEN_ERR_MSG: 'Нельзя удалять фильмы других',
  WRONG_URL_FORMAT_MSG: 'Неправильный формат ссылки',
};

module.exports = constants;
