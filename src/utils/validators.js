const { body, param, query, validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => err.msg);
    if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') !== -1)) {
      return res.status(422).json({ errors: extractedErrors });
    }
    req.session.flash = { error: extractedErrors };
    const referer = req.header('Referer') || '';
    if (!referer || referer.includes(req.path)) {
      return res.render('admin/login', { title: 'Security Login - UVO SoftTech', errors: extractedErrors });
    }
    return res.redirect(referer);
  }
  next();
}

const loginValidation = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

const userValidation = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 100 }).withMessage('First name must be under 100 characters')
    .escape(),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 100 }).withMessage('Last name must be under 100 characters')
    .escape(),
  body('roleIds')
    .optional()
    .isArray().withMessage('Roles must be an array'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  handleValidationErrors,
];

const serviceValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be under 200 characters')
    .escape(),
  body('description')
    .optional()
    .trim()
    .escape(),
  body('categoryId')
    .notEmpty().withMessage('Category is required')
    .isUUID().withMessage('Valid category ID is required'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  handleValidationErrors,
];

const serviceCategoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be under 100 characters')
    .escape(),
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Slug must be URL-friendly'),
  body('description')
    .optional()
    .trim()
    .escape(),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  handleValidationErrors,
];

const blogPostValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be under 200 characters')
    .escape(),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Excerpt must be under 500 characters')
    .escape(),
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Slug must be URL-friendly'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived']).withMessage('Invalid status'),
  body('metaTitle')
    .optional()
    .trim()
    .isLength({ max: 70 }).withMessage('Meta title must be under 70 characters')
    .escape(),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 160 }).withMessage('Meta description must be under 160 characters')
    .escape(),
  handleValidationErrors,
];

const productValidation = [
  body('brand')
    .trim()
    .notEmpty().withMessage('Brand is required')
    .isLength({ max: 100 }).withMessage('Brand must be under 100 characters')
    .escape(),
  body('model')
    .trim()
    .notEmpty().withMessage('Model is required')
    .isLength({ max: 100 }).withMessage('Model must be under 100 characters')
    .escape(),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('ram')
    .optional()
    .trim()
    .escape(),
  body('ssd')
    .optional()
    .trim()
    .escape(),
  body('hdd')
    .optional()
    .trim()
    .escape(),
  body('gpu')
    .optional()
    .trim()
    .escape(),
  body('description')
    .optional()
    .trim()
    .escape(),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  handleValidationErrors,
];

const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be under 100 characters')
    .escape(),
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters')
    .escape(),
  handleValidationErrors,
];

const settingsValidation = [
  body('key')
    .trim()
    .notEmpty().withMessage('Key is required')
    .isLength({ max: 100 }).withMessage('Key must be under 100 characters')
    .matches(/^[a-zA-Z0-9._-]+$/).withMessage('Key must contain only alphanumeric characters, dots, hyphens, and underscores'),
  body('value')
    .exists().withMessage('Value is required'),
  body('group')
    .trim()
    .notEmpty().withMessage('Group is required')
    .isLength({ max: 50 }).withMessage('Group must be under 50 characters')
    .escape(),
  body('type')
    .trim()
    .isIn(['text', 'textarea', 'number', 'boolean', 'json', 'image', 'color']).withMessage('Invalid type'),
  body('label')
    .trim()
    .notEmpty().withMessage('Label is required')
    .isLength({ max: 100 }).withMessage('Label must be under 100 characters')
    .escape(),
  handleValidationErrors,
];

const roleValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Role name is required')
    .isLength({ max: 50 }).withMessage('Role name must be under 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Role name must contain only alphanumeric characters, underscores, and hyphens'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Description must be under 255 characters')
    .escape(),
  body('permissionIds')
    .optional()
    .isArray().withMessage('Permissions must be an array'),
  handleValidationErrors,
];

const pageValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be under 200 characters')
    .escape(),
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Slug must be URL-friendly'),
  body('metaTitle')
    .optional()
    .trim()
    .isLength({ max: 70 }).withMessage('Meta title must be under 70 characters')
    .escape(),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 160 }).withMessage('Meta description must be under 160 characters')
    .escape(),
  body('isPublished')
    .optional()
    .isBoolean().withMessage('isPublished must be a boolean'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer'),
  handleValidationErrors,
];

const navigationValidation = [
  body('label')
    .trim()
    .notEmpty().withMessage('Label is required')
    .isLength({ max: 100 }).withMessage('Label must be under 100 characters')
    .escape(),
  body('href')
    .trim()
    .notEmpty().withMessage('URL is required')
    .isLength({ max: 500 }).withMessage('URL must be under 500 characters'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer'),
  body('isVisible')
    .optional()
    .isBoolean().withMessage('isVisible must be a boolean'),
  body('target')
    .optional()
    .isIn(['_self', '_blank', '_parent', '_top']).withMessage('Invalid target'),
  body('cssClass')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('CSS class must be under 200 characters')
    .escape(),
  handleValidationErrors,
];

const chatbotValidation = [
  body('triggerKeywords')
    .isArray({ min: 1 }).withMessage('At least one trigger keyword is required'),
  body('triggerKeywords.*')
    .trim()
    .notEmpty().withMessage('Trigger keyword cannot be empty'),
  body('responseText')
    .trim()
    .notEmpty().withMessage('Response text is required')
    .isLength({ max: 2000 }).withMessage('Response text must be under 2000 characters')
    .escape(),
  body('priority')
    .optional()
    .isInt({ min: 0 }).withMessage('Priority must be a non-negative integer'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  handleValidationErrors,
];

const mediaValidation = [
  body('altText')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Alt text must be under 255 characters')
    .escape(),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  loginValidation,
  userValidation,
  serviceValidation,
  serviceCategoryValidation,
  blogPostValidation,
  productValidation,
  contactValidation,
  settingsValidation,
  roleValidation,
  pageValidation,
  navigationValidation,
  chatbotValidation,
  mediaValidation,
};
