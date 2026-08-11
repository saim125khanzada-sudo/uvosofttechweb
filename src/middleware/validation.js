const { body, query, param } = require('express-validator');

const login = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 1 }).withMessage('Password is required'),
];

const createUser = [
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[a-zA-Z]/).withMessage('Password must contain a letter'),
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('First name is required and must be under 100 characters')
    .escape(),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Last name is required and must be under 100 characters')
    .escape(),
  body('roleIds')
    .optional()
    .isArray().withMessage('Roles must be an array'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
];

const updateUser = [
  body('email')
    .optional()
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[a-zA-Z]/).withMessage('Password must contain a letter'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('First name must be under 100 characters')
    .escape(),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Last name must be under 100 characters')
    .escape(),
  body('roleIds')
    .optional()
    .isArray().withMessage('Roles must be an array'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
];

const createService = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Title is required and must be under 200 characters')
    .escape(),
  body('description')
    .optional()
    .trim()
    .escape(),
  body('categoryId')
    .isUUID().withMessage('Valid category ID is required'),
  body('iconUrl')
    .optional()
    .trim()
    .isURL().withMessage('Icon URL must be valid'),
  body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Image URL must be valid'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
];

const updateService = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Title must be under 200 characters')
    .escape(),
  body('description')
    .optional()
    .trim()
    .escape(),
  body('categoryId')
    .optional()
    .isUUID().withMessage('Valid category ID is required'),
  body('iconUrl')
    .optional()
    .trim()
    .isURL().withMessage('Icon URL must be valid'),
  body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Image URL must be valid'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Sort order must be a non-negative integer'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
];

const createBlogPost = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Title is required and must be under 200 characters')
    .escape(),
  body('content')
    .trim()
    .isLength({ min: 1 }).withMessage('Content is required'),
  body('excerpt')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Excerpt must be under 500 characters')
    .escape(),
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage('Slug must be URL-friendly (lowercase, hyphens)'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived']).withMessage('Status must be draft, published, or archived'),
  body('featuredImageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Featured image URL must be valid'),
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
  body('metaKeywords')
    .optional()
    .trim()
    .escape(),
];

const updateBlogPost = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Title must be under 200 characters')
    .escape(),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1 }).withMessage('Content cannot be empty'),
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
    .isIn(['draft', 'published', 'archived']).withMessage('Status must be draft, published, or archived'),
  body('featuredImageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Featured image URL must be valid'),
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
  body('metaKeywords')
    .optional()
    .trim()
    .escape(),
];

const createProduct = [
  body('brand')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Brand is required and must be under 100 characters')
    .escape(),
  body('model')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Model is required and must be under 100 characters')
    .escape(),
  body('price')
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
  body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Image URL must be valid'),
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
];

const updateProduct = [
  body('brand')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Brand must be under 100 characters')
    .escape(),
  body('model')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Model must be under 100 characters')
    .escape(),
  body('price')
    .optional()
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
  body('imageUrl')
    .optional()
    .trim()
    .isURL().withMessage('Image URL must be valid'),
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
];

const contactForm = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Name is required and must be under 100 characters')
    .escape(),
  body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters')
    .escape(),
];

const createSettings = [
  body('key')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Key is required and must be under 100 characters')
    .matches(/^[a-zA-Z0-9._-]+$/).withMessage('Key must contain only alphanumeric characters, dots, hyphens, and underscores'),
  body('value')
    .exists().withMessage('Value is required'),
  body('group')
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage('Group is required and must be under 50 characters')
    .escape(),
  body('type')
    .trim()
    .isIn(['text', 'textarea', 'number', 'boolean', 'json', 'image', 'color'])
    .withMessage('Type must be one of: text, textarea, number, boolean, json, image, color'),
  body('label')
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Label is required and must be under 100 characters')
    .escape(),
];

const updateSettings = [
  body('value')
    .exists().withMessage('Value is required'),
  body('label')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Label must be under 100 characters')
    .escape(),
];

const createRole = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage('Role name is required and must be under 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Role name must contain only alphanumeric characters, underscores, and hyphens'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Description must be under 255 characters')
    .escape(),
  body('permissionIds')
    .optional()
    .isArray().withMessage('Permissions must be an array'),
];

const updateRole = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage('Role name must be under 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Role name must contain only alphanumeric characters, underscores, and hyphens'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Description must be under 255 characters')
    .escape(),
  body('permissionIds')
    .optional()
    .isArray().withMessage('Permissions must be an array'),
];

module.exports = {
  login,
  createUser,
  updateUser,
  createService,
  updateService,
  createBlogPost,
  updateBlogPost,
  createProduct,
  updateProduct,
  contactForm,
  createSettings,
  updateSettings,
  createRole,
  updateRole,
};
