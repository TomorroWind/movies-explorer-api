const { celebrate } = require('celebrate');
const Joi = require('joi');
const { default: validator } = require('validator');
const { messages } = require('../const');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }

  return helpers.message(messages.notValidUrl);
};

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(messages.notValidEmail)
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    password: Joi.string().required().alphanum().min(3)
      .messages({
        'string.min': `${messages.minLength} 3`,
        'any.required': messages.fieldIsRequired,
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': `${messages.minLength} 2`,
        'string.max': `${messages.maxLength} 30`,
        'any.required': messages.fieldIsRequired,
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(messages.notValidEmail)
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    password: Joi.string().required().min(3)
      .messages({
        'string.min': `${messages.minLength} 3`,
        'any.required': messages.fieldIsRequired,
      }),
  }),
});

const validateUpdateMe = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(messages.notValidEmail)
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': `${messages.minLength} 2`,
        'string.max': `${messages.maxLength} 30`,
        'any.required': messages.fieldIsRequired,
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required()
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    country: Joi.string().required().min(2)
      .messages({
        'string.min': `${messages.minLength} 2`,
        'any.required': messages.fieldIsRequired,
      }),
    director: Joi.string().required().min(2)
      .messages({
        'string.min': `${messages.minLength} 2`,
        'any.required': messages.fieldIsRequired,
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    year: Joi.string().required().min(2).max(4)
      .messages({
        'string.min': `${messages.minLength} 2`,
        'string.max': `${messages.maxLength} 4`,
        'any.required': messages.fieldIsRequired,
      }),
    description: Joi.string().required()
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    image: Joi.string().required().custom(validateUrl)
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    trailer: Joi.string().required().custom(validateUrl)
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    thumbnail: Joi.string().required().custom(validateUrl)
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': messages.fieldIsRequired,
      }),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24)
      .messages({
        'string.length': messages.idLength,
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
