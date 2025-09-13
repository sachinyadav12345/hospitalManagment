// Mock API layer for dental clinic app
// TODO: Replace with real API endpoints in production

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Seed data
const seedDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@clinic.com',
    phone: '+1-555-0101',
    specialization: 'General Dentistry',
    clinicName: 'Bright Smile Dental',
    bio: 'Experienced general dentist with 10+ years of practice.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    createdAt: '2023-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@clinic.com',
    phone: '+1-555-0102',
    specialization: 'Orthodontics',
    clinicName: 'Bright Smile Dental',
    bio: 'Specialist in orthodontics and teeth alignment.',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2023-01-20T10:00:00Z'
  },
  {
    id: '3',
    name: 'Dr. David Kim',
    email: 'david.kim@clinic.com',
    phone: '+1-555-0104',
    specialization: 'Periodontics',
    clinicName: 'Bright Smile Dental',
    bio: 'Periodontist specializing in gum disease treatment.',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    createdAt: '2023-02-10T10:00:00Z'
  },
  {
  id: '4',
    name: 'Dr. Lisa Thompson',
    email: 'lisa.thompson@clinic.com',
    phone: '+1-555-0105',
    specialization: 'Pediatric Dentistry',
    clinicName: 'Bright Smile Dental',
    bio: 'Pediatric dentist with gentle approach to children\'s dental care.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    createdAt: '2023-02-15T10:00:00Z'
  }
];

const seedPatients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-1001',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    address: '123 Main St, City, State 12345',
    assignedDoctorId: '1',
    notes: 'Regular checkup patient, no major issues.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastVisitDate: '2023-12-01T10:00:00Z',
    createdAt: '2023-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Robert Wilson',
    email: 'robert.wilson@email.com',
    phone: '+1-555-1003',
    dateOfBirth: '1978-11-08',
    gender: 'male',
    address: '789 Pine Rd, City, State 12345',
    assignedDoctorId: '1',
    notes: 'Needs wisdom tooth extraction.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastVisitDate: '2023-11-25T09:15:00Z',
    createdAt: '2023-02-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1-555-1004',
    dateOfBirth: '1992-04-12',
    gender: 'female',
    address: '321 Elm St, City, State 12345',
    assignedDoctorId: '3',
    notes: 'Post-surgery follow-up required.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastVisitDate: '2023-11-20T16:45:00Z',
    createdAt: '2023-02-05T10:00:00Z'
  },
  {
    id: '4',
    name: 'James Brown',
    email: 'james.brown@email.com',
    phone: '+1-555-1005',
    dateOfBirth: '1988-09-30',
    gender: 'male',
    address: '654 Maple Dr, City, State 12345',
    assignedDoctorId: '4',
    notes: 'Gum disease treatment ongoing.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    lastVisitDate: '2023-11-18T11:30:00Z',
    createdAt: '2023-02-10T10:00:00Z'
  },
  {
    id: '5',
    name: 'Sarah Davis',
    email: 'sarah.davis@email.com',
    phone: '+1-555-1006',
    dateOfBirth: '1995-12-03',
    gender: 'female',
    address: '987 Cedar Ln, City, State 12345',
    assignedDoctorId: '5',
    notes: 'Pediatric patient, first visit.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    lastVisitDate: '2023-11-15T13:20:00Z',
    createdAt: '2023-02-12T10:00:00Z'
  },
  {
    id: '6',
    name: 'Michael Johnson',
    email: 'michael.johnson@email.com',
    phone: '+1-555-1007',
    dateOfBirth: '1982-06-18',
    gender: 'male',
    address: '147 Birch St, City, State 12345',
    assignedDoctorId: '1',
    notes: 'Regular cleaning and checkup.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastVisitDate: '2023-11-12T08:45:00Z',
    createdAt: '2023-02-15T10:00:00Z'
  },
  {
    id: '7',
    name: 'Emily White',
    email: 'emily.white@email.com',
    phone: '+1-555-1008',
    dateOfBirth: '1991-01-25',
    gender: 'female',
    address: '258 Spruce Ave, City, State 12345',
    assignedDoctorId: '2',
    notes: 'Braces adjustment appointment.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    lastVisitDate: '2023-11-10T15:30:00Z',
    createdAt: '2023-02-18T10:00:00Z'
  },
  {
    id: '8',
    name: 'David Lee',
    email: 'david.lee@email.com',
    phone: '+1-555-1009',
    dateOfBirth: '1975-08-14',
    gender: 'male',
    address: '369 Willow Way, City, State 12345',
    assignedDoctorId: '3',
    notes: 'Consultation for dental implant.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    lastVisitDate: '2023-11-08T12:15:00Z',
    createdAt: '2023-02-20T10:00:00Z'
  },
  {
    id: '9',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1-555-1010',
    dateOfBirth: '1987-05-07',
    gender: 'female',
    address: '741 Poplar Blvd, City, State 12345',
    assignedDoctorId: '4',
    notes: 'Deep cleaning and scaling.',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    lastVisitDate: '2023-11-05T10:00:00Z',
    createdAt: '2023-02-22T10:00:00Z'
  }
];

// In-memory storage (simulates database)
let doctors = [...seedDoctors];
let patients = [...seedPatients];
let users = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@clinic.com',
    role: 'admin',
    clinicName: 'Bright Smile Dental'
  },
  {
    id: 'doctor-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@clinic.com',
    role: 'doctor',
    clinicName: 'Bright Smile Dental'
  },
  {
    id: 'staff-1',
    name: 'Staff Member',
    email: 'staff@clinic.com',
    role: 'staff',
    clinicName: 'Bright Smile Dental'
  }
];

// Helper functions
const generateId = () => Math.random().toString(36).substr(2, 9);
const findUserByEmail = (email) => users.find(user => user.email === email);
const findDoctorById = (id) => doctors.find(doctor => doctor.id === id);
const findPatientById = (id) => patients.find(patient => patient.id === id);

// Role-based permission checks
const canManageDoctors = (userRole) => ['admin'].includes(userRole);
const canManagePatients = (userRole) => ['admin', 'doctor', 'staff'].includes(userRole);
const canDeletePatients = (userRole) => ['admin', 'doctor'].includes(userRole);
const canEditDoctor = (userRole, doctorId, currentUserId) => {
  if (userRole === 'admin') return true;
  if (userRole === 'doctor' && doctorId === currentUserId) return true;
  return false;
};

// Auth API
export const authApi = {
  async signup(userData) {
    await delay();
    
    const { name, email, password, role, clinicName } = userData;
    
    // TODO: In production, role assignment should be server-side controlled
    // This is a demo implementation allowing role selection during signup
    
    if (findUserByEmail(email)) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = {
      id: generateId(),
      name,
      email,
      role,
      clinicName: clinicName || 'Bright Smile Dental'
    };
    
    users.push(newUser);
    
    return {
      token: `mock-token-${generateId()}`,
      user: newUser
    };
  },
  
  async login(credentials) {
    await delay();
    
    const { email, password } = credentials;
    const user = findUserByEmail(email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Mock password validation (in production, use proper hashing)
    if (password !== 'password123') {
      throw new Error('Invalid email or password');
    }
    
    return {
      token: `mock-token-${generateId()}`,
      user
    };
  }
};

// Patients API
export const patientsApi = {
  async getPatients(params = {}) {
    await delay();
    
    const { page = 1, limit = 10, search = '', doctorId = '' } = params;
    let filteredPatients = [...patients];
    
    // Apply search filter
    if (search) {
      filteredPatients = filteredPatients.filter(patient =>
        patient.name.toLowerCase().includes(search.toLowerCase()) ||
        patient.email.toLowerCase().includes(search.toLowerCase()) ||
        patient.phone.includes(search)
      );
    }
    
    // Apply doctor filter
    if (doctorId) {
      filteredPatients = filteredPatients.filter(patient =>
        patient.assignedDoctorId === doctorId
      );
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPatients = filteredPatients.slice(startIndex, endIndex);
    
    return {
      data: paginatedPatients,
      total: filteredPatients.length,
      page,
      limit,
      totalPages: Math.ceil(filteredPatients.length / limit)
    };
  },
  
  async getPatient(id) {
    await delay();
    
    const patient = findPatientById(id);
    if (!patient) {
      throw new Error('Patient not found');
    }
    
    return patient;
  },
  
  async createPatient(patientData, currentUser) {
    await delay();
    
    if (!canManagePatients(currentUser.role)) {
      throw new Error('Insufficient permissions');
    }
    
    const newPatient = {
      id: generateId(),
      ...patientData,
      createdAt: new Date().toISOString()
    };
    
    patients.push(newPatient);
    return newPatient;
  },
  
  async updatePatient(id, patientData, currentUser) {
    await delay();
    
    const patient = findPatientById(id);
    if (!patient) {
      throw new Error('Patient not found');
    }
    
    // Check permissions: admin/staff can edit any patient, doctor can edit assigned patients
    const canEdit = currentUser.role === 'admin' || 
                   currentUser.role === 'staff' ||
                   (currentUser.role === 'doctor' && patient.assignedDoctorId === currentUser.id);
    
    if (!canEdit) {
      throw new Error('Insufficient permissions');
    }
    
    const patientIndex = patients.findIndex(p => p.id === id);
    patients[patientIndex] = { ...patient, ...patientData };
    
    return patients[patientIndex];
  },
  
  async deletePatient(id, currentUser) {
    await delay();
    
    const patient = findPatientById(id);
    if (!patient) {
      throw new Error('Patient not found');
    }
    
    // Check permissions: admin or assigned doctor can delete
    const canDelete = currentUser.role === 'admin' ||
                     (currentUser.role === 'doctor' && patient.assignedDoctorId === currentUser.id);
    
    if (!canDelete) {
      throw new Error('Insufficient permissions');
    }
    
    const patientIndex = patients.findIndex(p => p.id === id);
    patients.splice(patientIndex, 1);
    
    return { success: true };
  }
};

// Doctors API
export const doctorsApi = {
  async getDoctors(params = {}) {
    await delay();
    
    const { page = 1, limit = 10, search = '' } = params;
    let filteredDoctors = [...doctors];
    
    // Apply search filter
    if (search) {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.email.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
    
    return {
      data: paginatedDoctors,
      total: filteredDoctors.length,
      page,
      limit,
      totalPages: Math.ceil(filteredDoctors.length / limit)
    };
  },
  
  async getDoctor(id) {
    await delay();
    
    const doctor = findDoctorById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    
    return doctor;
  },
  
  async createDoctor(doctorData, currentUser) {
    await delay();
    
    if (!canManageDoctors(currentUser.role)) {
      throw new Error('Insufficient permissions');
    }
    
    const newDoctor = {
      id: generateId(),
      ...doctorData,
      createdAt: new Date().toISOString()
    };
    
    doctors.push(newDoctor);
    return newDoctor;
  },
  
  async updateDoctor(id, doctorData, currentUser) {
    await delay();
    
    const doctor = findDoctorById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    
    if (!canEditDoctor(currentUser.role, id, currentUser.id)) {
      throw new Error('Insufficient permissions');
    }
    
    const doctorIndex = doctors.findIndex(d => d.id === id);
    doctors[doctorIndex] = { ...doctor, ...doctorData };
    
    return doctors[doctorIndex];
  },
  
  async deleteDoctor(id, currentUser) {
    await delay();
    
    if (!canManageDoctors(currentUser.role)) {
      throw new Error('Insufficient permissions');
    }
    
    const doctor = findDoctorById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    
    const doctorIndex = doctors.findIndex(d => d.id === id);
    doctors.splice(doctorIndex, 1);
    
    return { success: true };
  }
};

// Export all APIs
export const mockApi = {
  auth: authApi,
  patients: patientsApi,
  doctors: doctorsApi
};
