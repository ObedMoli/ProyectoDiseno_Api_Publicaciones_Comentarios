// utils.js

// Mapeo de códigos HTTP
export const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  INTERNAL_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503
};

// Respuestas de éxito
export const ok = (message = 'Operación exitosa', data = null) => ({
  status: HTTP_CODES.OK,
  success: true,
  message,
  data
});

export const created = (message = 'Recurso creado exitosamente', data = null) => ({
  status: HTTP_CODES.CREATED,
  success: true,
  message,
  data
});

export const accepted = (message = 'Solicitud aceptada para procesamiento', data = null) => ({
  status: HTTP_CODES.ACCEPTED,
  success: true,
  message,
  data
});

export const noContent = (message = 'Sin contenido') => ({
  status: HTTP_CODES.NO_CONTENT,
  success: true,
  message,
  data: null
});

// Respuestas de error del cliente
export const badRequest = (message = 'Solicitud incorrecta', errors = null) => ({
  status: HTTP_CODES.BAD_REQUEST,
  success: false,
  message,
  errors
});

export const unauthorized = (message = 'No autorizado') => ({
  status: HTTP_CODES.UNAUTHORIZED,
  success: false,
  message
});

export const forbidden = (message = 'Acceso prohibido') => ({
  status: HTTP_CODES.FORBIDDEN,
  success: false,
  message
});

export const notFound = (message = 'Recurso no encontrado') => ({
  status: HTTP_CODES.NOT_FOUND,
  success: false,
  message
});

export const conflict = (message = 'Conflicto en la solicitud') => ({
  status: HTTP_CODES.CONFLICT,
  success: false,
  message
});

// Errores del servidor
export const internalError = (message = 'Error interno del servidor', details = null) => ({
  status: HTTP_CODES.INTERNAL_ERROR,
  success: false,
  message,
  details
});

export const notImplemented = (message = 'Funcionalidad no implementada') => ({
  status: HTTP_CODES.NOT_IMPLEMENTED,
  success: false,
  message
});

export const serviceUnavailable = (message = 'Servicio no disponible') => ({
  status: HTTP_CODES.SERVICE_UNAVAILABLE,
  success: false,
  message
});
