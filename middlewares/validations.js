const { celebrate } = require('celebrate');
const Joi = require('joi');
const { default: validator } = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }

  return helpers.message('Поле должно быть валидным URL адресом');
};

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле email должно быть валидным email адресом')
      .messages({
        'any.required': 'Поле email обязательно для заполнения',
      }),
    password: Joi.string().required().alphanum().min(3)
      .messages({
        'string.min': 'Минимальная длина поля password  - 3',
        'any.required': 'Поле password обязательно для заполнения',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля name  - 2',
        'string.max': 'Максимальное длина поля name - 30',
        'any.required': 'Поле name обязательно для заполнения',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле email должно быть валидным email адресом')
      .messages({
        'any.required': 'Поле email обязательно для заполнения',
      }),
    password: Joi.string().required().min(3)
      .messages({
        'string.min': 'Минимальная длина поля password  - 3',
        'any.required': 'Поле password обязательно для заполнения',
      }),
  }),
});

const validateUpdateMe = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле email должно быть валидным email адресом')
      .messages({
        'any.required': 'Поле email обязательно для заполнения',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля name  - 2',
        'string.max': 'Максимальное длина поля name - 30',
        'any.required': 'Поле name обязательно для заполнения',
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Поле movieId обязательно для заполнения',
      }),
    country: Joi.string().required().min(2)
      .messages({
        'string.min': 'Минимальная длина поля country  - 2',
        'any.required': 'Поле country обязательно для заполнения',
      }),
    director: Joi.string().required().min(2)
      .messages({
        'string.min': 'Минимальная длина поля director  - 2',
        'any.required': 'Поле director обязательно для заполнения',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле duration обязательно для заполнения',
      }),
    year: Joi.string().required().min(2).max(4)
      .messages({
        'string.min': 'Минимальная длина поля year  - 2',
        'string.max': 'Максимальное длина поля year - 4',
        'any.required': 'Поле year обязательно для заполнения',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле description обязательно для заполнения',
      }),
    image: Joi.string().required().custom(validateUrl)
      .messages({
        'any.required': 'Поле image обязательно для заполнения',
      }),
    trailer: Joi.string().required().custom(validateUrl)
      .messages({
        'any.required': 'Поле trailer обязательно для заполнения',
      }),
    thumbnail: Joi.string().required().custom(validateUrl)
      .messages({
        'any.required': 'Поле thumbnail обязательно для заполнения',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле nameRU обязательно для заполнения',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле nameEN обязательно для заполнения',
      }),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24)
      .messages({
        'string.length': 'Длина идентификатора фильма должна быть 24 символа',
      }),
  }),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateMe,
  validateCreateMovie,
  validateDeleteMovie,
};
