import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/auth_context';
import AuthRoute from './routes/auth_route';

const Login = lazy(() => import("./core/public/login"));
const HomePage = lazy(() => import("./core/private/event_explorer/home_page"));
const Dashboard = lazy(() => import("./core/private/event_organizer/dasboard"));
const RoleSelection = lazy(() => import("./core/public/role_selection"));
const EventExplorerRegistration = lazy(() => import("./core/public/event_explorer_registration"));
const EventOrganizerRegistration = lazy(() => import("./core/public/event_organizer_registration"));

const queryClient = new QueryClient();

function App() {
  const routes = [
    //--------------------------------Public Routes---------------------------------------
    {
      path: "/login",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
      errorElement: <>error</>
    },

    {
      path: "/role-selection",
      element: (
        <Suspense>
          <RoleSelection />
        </Suspense>
      ),
      errorElement: <>error</>
    },

    {
      path: "/event-explorer-registration",
      element: (
        <Suspense>
          <EventExplorerRegistration />
        </Suspense>
      ),
      errorElement: <>error</>
    },

    {
      path: "/event-organizer-registration",
      element: (
        <Suspense>
          <EventOrganizerRegistration />
        </Suspense>
      ),
      errorElement: <>error</>
    },

    //--------------------------------Private Routes---------------------------------------
    {
      path: "/home",
      element: (
        <AuthRoute requiredRole="event explorer" element={<Suspense><HomePage/></Suspense>} />
      )
    },

    {
      path: "/dashboard",
      element: (
        <AuthRoute requiredRole="event organizer" element={<Suspense><Dashboard/></Suspense>} />
      )
    },
  ]

  const router = createBrowserRouter(routes);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
