# RoomMate - Frontend Web Application

Turkey's verified flatmate platform - Next.js frontend implementation.

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   ├── auth/
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── dashboard/               # User dashboard
│   ├── listings/
│   │   ├── page.tsx             # Listings search
│   │   └── create/              # Create listing
│   └── verify/                  # Verification flow
├── components/
│   ├── auth/                    # Auth components
│   ├── listings/                # Listing components
│   ├── messaging/               # Messaging components
│   ├── verification/            # Verification components
│   └── common/                  # Shared components
├── lib/                         # Utility functions
├── hooks/                       # Custom React hooks
└── types/                       # TypeScript types
```

## Features (V1 - MVP)

- ✅ User Registration with Phone Verification (OTP)
- ✅ User Login
- ✅ Profile Creation & Management
- ✅ Listing Creation (3 types)
- ✅ Listing Search & Discovery
- ✅ In-App Messaging UI
- ✅ Verification Status Display
- ✅ Flatmate Score Display
- ✅ Dashboard Overview

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (ready to integrate)
- **Forms**: React Hook Form + Zod
- **UI Components**: Lucide React Icons
- **API Client**: Axios (ready to configure)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Windows setup notes (npm troubleshooting)

- If `npm` is not recognized after installing Node.js, close all PowerShell / terminal windows and re-open them so the updated PATH is loaded.
- If PowerShell blocks running `npm` scripts, run (in an elevated PowerShell if needed):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- Use Windows package managers if you prefer:

```powershell
winget install OpenJS.NodeJS

# or (if you use chocolatey)
choco install nodejs
```

- After installing Node.js, run:

```powershell
cd c:\Users\acosg\materooms
npm install
npm run dev
```

## VS Code helpers

- Recommended extensions are suggested in the workspace file: [.vscode/extensions.json](.vscode/extensions.json)
- Predefined tasks are available in [.vscode/tasks.json](.vscode/tasks.json) to run `npm install`, `npm run dev` and `npm run build` from the Command Palette (Run Task).

## What I added to complete local setup tasks

- Workspace tasks: [.vscode/tasks.json](.vscode/tasks.json)
- VS Code recommendations: [.vscode/extensions.json](.vscode/extensions.json)


### Building

```bash
npm run build
npm run start
```

## Pages Overview

### Public Pages
- `/` - Landing page with product info
- `/auth/register` - Multi-step registration (phone → OTP → profile)
- `/auth/login` - Phone-based login

### Protected Pages (Require Auth)
- `/dashboard` - User dashboard with stats
- `/listings` - Search and discover listings
- `/listings/create` - Multi-step listing creation
- `/listings/[id]` - Listing details (to be implemented)
- `/messages` - Messaging inbox (to be implemented)
- `/profile` - User profile (to be implemented)
- `/verify` - Verification steps (to be implemented)

## API Integration Points

The frontend is ready to integrate with the backend FastAPI server:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/verify-otp`
- `POST /api/v1/auth/login`
- `GET /api/v1/users/{user_id}`
- `PATCH /api/v1/users/{user_id}/profile`
- `POST /api/v1/listings/`
- `GET /api/v1/listings/`
- `POST /api/v1/verify/*`

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=RoomMate
```

## Development Guidelines

### Component Structure
- All components use TypeScript
- Client components marked with `'use client'`
- Consistent naming: PascalCase for components, camelCase for utils
- Props interfaces defined at component top

### Styling
- Use Tailwind CSS utilities
- Custom styles in `src/app/globals.css`
- Color scheme: Primary (Red), Secondary (Teal), Success (Green)

### State Management
- Use Zustand for global state (ready to implement)
- Local state with useState for component-level
- Custom hooks in `src/hooks/`

## Next Steps

1. **Backend Integration**: Connect to FastAPI backend
2. **Authentication State**: Implement Zustand store for auth state
3. **API Client**: Setup Axios interceptors for API calls
4. **Messaging**: WebSocket integration for real-time messages
5. **Payment Integration**: İyzico payment widget
6. **Advanced Features**: Video verification, expense splitting

## Roadmap

- [ ] Backend API integration
- [ ] Real-time messaging with WebSockets
- [ ] Payment system integration
- [ ] Video verification flow
- [ ] Advanced search filters
- [ ] User profile pages
- [ ] Notification system
- [ ] Mobile optimization

## Contributing

Follow these practices:
- Use TypeScript for all new code
- Keep components small and reusable
- Write clear commit messages
- Test responsive design at 375px, 768px, 1024px

## License

Proprietary - RoomMate Platform
