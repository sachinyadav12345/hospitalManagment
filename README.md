# Dental Clinic Management System

A comprehensive React frontend application for managing dental clinic operations, including patient and doctor management with role-based access control.

## 🚀 Features

### Authentication & Authorization
- **Multi-role authentication** (Admin, Doctor, Staff)
- **Protected routes** with role-based access control
- **Persistent login** using localStorage
- **Demo credentials** for testing

### Patient Management
- **Complete CRUD operations** for patient records
- **Advanced search and filtering** by doctor assignment
- **Patient detail views** with comprehensive information
- **Photo upload support** (URL-based)
- **Responsive patient cards** with grid/list view options

### Doctor Management
- **Doctor profile management** with specializations
- **Role-based permissions** for editing/deleting doctors
- **Professional information** tracking
- **Avatar support** for doctor profiles

### Dashboard
- **KPI cards** showing key metrics
- **Quick action buttons** for common tasks
- **Recent patients** overview
- **Role-specific** dashboard content

### UI/UX
- **Modern teal/blue theme** optimized for healthcare
- **Responsive design** for all screen sizes
- **Accessible components** with proper ARIA attributes
- **Toast notifications** for user feedback
- **Modal dialogs** for forms and confirmations
- **Loading states** and error handling

## 🛠️ Tech Stack

- **React 18** with Vite for fast development
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Formik + Yup** for form handling and validation
- **Lucide React** for icons
- **Mock API** layer for backend simulation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dental-clinic-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

The application includes pre-configured demo accounts for testing:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | `admin@clinic.com` | `password123` | Full access to all features |
| **Doctor** | `sarah.johnson@clinic.com` | `password123` | Manage patients, edit own profile |
| **Staff** | `staff@clinic.com` | `password123` | Create/update patients, limited access |

## 🏗️ Project Structure

```
src/
├── api/
│   └── mockApi.js              # Mock API layer with seed data
├── components/
│   ├── auth/                    # Authentication components
│   ├── dashboard/               # Dashboard components
│   ├── doctors/                 # Doctor management components
│   ├── layout/                  # Layout components (Header, Sidebar)
│   ├── patients/                # Patient management components
│   └── ui/                      # Reusable UI components
├── hooks/                       # Custom React hooks
├── store/
│   ├── slices/                  # Redux slices
│   └── store.js                 # Store configuration
├── utils/                       # Utility functions
└── App.jsx                      # Main application component
```

## 🎯 Key Components

### Authentication System
- **LoginForm**: Email/password authentication with demo credentials
- **SignupForm**: User registration with role selection (demo only)
- **PrivateRoute**: Route protection based on authentication status

### Patient Management
- **PatientList**: Paginated, searchable patient list with filters
- **PatientForm**: Comprehensive patient registration/edit form
- **PatientCard**: Individual patient display with actions
- **PatientDetailModal**: Detailed patient information view

### Doctor Management
- **DoctorList**: Doctor directory with search functionality
- **DoctorForm**: Doctor profile creation/editing
- **DoctorCard**: Doctor profile display
- **DoctorDetail**: Comprehensive doctor profile view

### UI Components
- **Button**: Customizable button with variants and loading states
- **Input**: Form input with validation display
- **Modal**: Accessible modal dialog system
- **Card**: Consistent card layout component
- **Avatar**: User profile image display
- **Toast**: Notification system

## 🔒 Role-Based Permissions

### Admin
- ✅ Full access to all features
- ✅ Create, edit, delete doctors and patients
- ✅ View all data and reports
- ✅ Manage user accounts

### Doctor
- ✅ View and manage assigned patients
- ✅ Edit own profile information
- ✅ Create and update patient records
- ✅ Delete assigned patients
- ❌ Cannot delete other doctors
- ❌ Cannot manage other doctors

### Staff
- ✅ Create and update patient records
- ✅ View patient information
- ✅ Manage appointments
- ❌ Cannot delete doctors
- ❌ Limited doctor editing permissions

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#1eadbd) - Professional healthcare theme
- **Secondary**: Blue tones for accents
- **Neutral**: Gray scale for text and backgrounds
- **Status**: Green (success), Red (error), Yellow (warning)

### Typography
- **Font**: Inter - Clean, readable sans-serif
- **Hierarchy**: Clear heading and body text sizes
- **Accessibility**: High contrast ratios

### Components
- **Rounded corners**: Consistent border radius
- **Shadows**: Subtle elevation for cards and modals
- **Spacing**: Consistent padding and margins
- **Responsive**: Mobile-first design approach

## 🚧 Development Notes

### Mock API
The application uses a comprehensive mock API layer (`src/api/mockApi.js`) that simulates:
- **Network delays** for realistic user experience
- **Role-based permissions** enforcement
- **Seed data** with 5 doctors and 10 patients
- **CRUD operations** for all entities

### State Management
- **Redux Toolkit** for centralized state management
- **Async thunks** for API calls
- **Normalized state** structure
- **Error handling** with user-friendly messages

### Form Handling
- **Formik** for form state management
- **Yup** for validation schemas
- **Real-time validation** with error display
- **Accessible form labels** and ARIA attributes

## 🔄 TODO: Production Considerations

### Security
- [ ] **Server-side role assignment** - Currently roles are selected during signup (demo only)
- [ ] **JWT token validation** - Replace mock tokens with real JWT implementation
- [ ] **API endpoint security** - Implement proper authentication middleware
- [ ] **Input sanitization** - Add server-side validation and sanitization

### API Integration
- [ ] **Replace mock API** with real backend endpoints
- [ ] **Error handling** - Implement comprehensive error handling
- [ ] **Loading states** - Add skeleton loaders for better UX
- [ ] **Offline support** - Consider service worker implementation

### Performance
- [ ] **Code splitting** - Implement route-based code splitting
- [ ] **Image optimization** - Add image compression and lazy loading
- [ ] **Caching** - Implement proper caching strategies
- [ ] **Bundle optimization** - Analyze and optimize bundle size

### Testing
- [ ] **Unit tests** - Add comprehensive test coverage
- [ ] **Integration tests** - Test component interactions
- [ ] **E2E tests** - Add end-to-end testing with Cypress/Playwright
- [ ] **Accessibility tests** - Ensure WCAG compliance

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1024px+): Full sidebar navigation
- **Tablet** (768px - 1023px): Collapsible sidebar
- **Mobile** (320px - 767px): Mobile-first design with touch-friendly interfaces

## 🎯 Future Enhancements

### Features
- **Appointment scheduling** system
- **Medical records** management
- **Billing and invoicing** module
- **Reports and analytics** dashboard
- **Patient portal** for self-service
- **Telemedicine** integration

### Technical
- **Real-time updates** with WebSocket integration
- **Progressive Web App** (PWA) capabilities
- **Dark mode** theme support
- **Internationalization** (i18n) support
- **Advanced search** with filters and sorting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo credentials for testing

---

**Note**: This is a demo application for educational purposes. In production, implement proper security measures, server-side validation, and real API integration.
