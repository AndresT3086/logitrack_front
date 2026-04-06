export const validationRules = {
  email: {
    required: 'El correo electrónico es requerido.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Ingresa un correo electrónico válido.',
    },
  },
  password: {
    required: 'La contraseña es requerida.',
    minLength: {
      value: 6,
      message: 'La contraseña debe tener al menos 6 caracteres.',
    },
  },
};
