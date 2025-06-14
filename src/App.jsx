import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/auth_context';
import AuthRoute from './routes/auth_route';

const Login = lazy(() => import("./core/public/login"));
const Home = lazy(() => import("./core/public/home"));
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
      path: "/",
      element: (
        <Suspense>
          <Home />
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

    //--------------------------------Private Routes--------------------------------------
    {
      path: "/dashboard",
      element: (
        <AuthRoute requiredRole="event organizer" element={<Suspense><Dashboard /></Suspense>} />
      )
    },
  ]

  const router = createBrowserRouter(routes);

  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
