# RoomMate Frontend - Copilot Instructions

## Project Overview
Next.js-based frontend for RoomMate, Turkey's verified flatmate platform. Built with TypeScript, Tailwind CSS, and modern React patterns.

## Architecture & Code Standards

### Structure
- **App Router**: Next.js 15+ App Router with src/ directory
- **Components**: TypeScript React components with proper type definitions
- **Styling**: Tailwind CSS with custom utility classes in globals.css
- **State**: Ready for Zustand integration
- **Forms**: React Hook Form + Zod for validation

### Component Patterns
- Client components explicitly marked with 'use client'
- Props interfaces at top of component
- Custom hooks in src/hooks/
- Shared components in src/components/common/

### TypeScript
- Strict mode enabled
- Type definitions in src/types/
- No implicit any types
- Proper interface exports

## Key Pages & Routes

### Auth Flow
- `/auth/register` - Multi-step: phone → OTP → profile
- `/auth/login` - Phone + OTP login

### Main App
- `/dashboard` - User dashboard with stats
- `/listings` - Search & discovery
- `/listings/create` - Multi-step listing creation
- `/verify` - Verification steps

## API Integration Points

Backend FastAPI routes to integrate:
- Auth: `/api/v1/auth/register`, `/verify-otp`, `/login`
- Users: `/api/v1/users/`, `/profile`
- Listings: `/api/v1/listings/`
- Verification: `/api/v1/verify/*`

Configure API URL in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Styling Guidelines

### Color Palette
- Primary (Red): `#FF6B6B`
- Secondary (Teal): `#4ECDC4`
- Success (Green): `#26C281`
- Warning (Yellow): `#F9CA24`
- Dark: `#2D3436`
- Light: `#F5F6FA`

### Utility Classes (globals.css)
- `.btn-primary` / `.btn-secondary` / `.btn-outline` - Buttons
- `.input-field` - Form inputs
- `.card` - Card container
- `.container-main` - Content container

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Common Tasks

### Adding a New Page
1. Create route in `src/app/path/page.tsx`
2. Use `'use client'` if interactive
3. Import DashboardHeader for protected pages
4. Use Tailwind for styling

### Creating Components
1. Define interface for props
2. Export as default function
3. Place in appropriate subfolder under src/components/
4. Import Lucide icons as needed

### Form Implementation
1. Use React Hook Form + Zod
2. Create validation schema in types/
3. Use useForm hook
4. Apply input-field class to inputs

## Next Phase: Backend Integration

When backend is ready:
1. Setup API client with Axios
2. Create Zustand stores for auth/user state
3. Implement proper error handling
4. Add loading states to forms
5. Integrate real API calls

## Performance & Best Practices

- Use dynamic imports for heavy components
- Image optimization with Next.js Image
- Lazy load form components
- Proper error boundaries
- Loading states for async operations

## Known Limitations (V1)

- No real API integration yet (mock data)
- File uploads not implemented
- WebSocket messaging not yet added
- Payment system UI only
- Form submissions redirect to home

These will be addressed in V2 with backend integration.
