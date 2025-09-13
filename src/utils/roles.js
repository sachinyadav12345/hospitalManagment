// Role-based permission utilities

export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  STAFF: 'staff'
}

export const PERMISSIONS = {
  MANAGE_DOCTORS: 'manage_doctors',
  MANAGE_PATIENTS: 'manage_patients',
  DELETE_PATIENTS: 'delete_patients',
  EDIT_DOCTOR: 'edit_doctor',
  DELETE_DOCTOR: 'delete_doctor',
  VIEW_REPORTS: 'view_reports'
}

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_DOCTORS,
    PERMISSIONS.MANAGE_PATIENTS,
    PERMISSIONS.DELETE_PATIENTS,
    PERMISSIONS.EDIT_DOCTOR,
    PERMISSIONS.DELETE_DOCTOR,
    PERMISSIONS.VIEW_REPORTS
  ],
  [ROLES.DOCTOR]: [
    PERMISSIONS.MANAGE_PATIENTS,
    PERMISSIONS.DELETE_PATIENTS,
    PERMISSIONS.EDIT_DOCTOR,
    PERMISSIONS.VIEW_REPORTS
  ],
  [ROLES.STAFF]: [
    PERMISSIONS.MANAGE_PATIENTS
  ]
}

export const hasPermission = (userRole, permission) => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false
}

export const canManageDoctors = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.MANAGE_DOCTORS)
}

export const canManagePatients = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.MANAGE_PATIENTS)
}

export const canDeletePatients = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.DELETE_PATIENTS)
}

export const canEditDoctor = (userRole, doctorId, currentUserId) => {
  if (hasPermission(userRole, PERMISSIONS.EDIT_DOCTOR)) {
    return true
  }
  // Doctors can edit their own profile
  if (userRole === ROLES.DOCTOR && doctorId === currentUserId) {
    return true
  }
  return false
}

export const canDeleteDoctor = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.DELETE_DOCTOR)
}

export const canViewReports = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.VIEW_REPORTS)
}
