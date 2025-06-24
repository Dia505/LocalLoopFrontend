import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/auth_context';
import AuthRoute from './routes/auth_route';

const Login = lazy(() => import("./core/public/login"));
const Home = lazy(() => import("./core/public/home"));
const RoleSelection = lazy(() => import("./core/public/role_selection"));
const EventExplorerRegistration = lazy(() => import("./core/public/event_explorer_registration"));
const EventOrganizerRegistration = lazy(() => import("./core/public/event_organizer_registration"));
const Search = lazy(() => import("./core/public/search"));
const EventDetails = lazy(() => import("./core/public/event_details"));
const Contact = lazy(() => import("./core/public/contact"));

const Dashboard = lazy(() => import("./core/private/event_organizer/dasboard"));
const EventExplorerProfile = lazy(() => import("./core/private/event_explorer/event_explorer_profile"));
const MyBookings = lazy(() => import("./core/private/event_explorer/my_bookings"));
const MyTickets = lazy(() => import("./core/private/event_explorer/my_tickets"));
const MyEvents = lazy(() => import("./core/private/event_organizer/my_events"));
const ViewEvent = lazy(() => import("./core/private/event_organizer/view_event"));

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

    {
      path: "/search",
      element: (
        <Suspense>
          <Search />
        </Suspense>
      ),
      errorElement: <>error</>
    },

    {
      path: "/search/:query",
      element: (
        <Suspense>
          <Search />
        </Suspense>
      ),
      errorElement: <>error</>
    },

    {
      path: "/event-details/:_id",
      element: (
        <Suspense>
          <EventDetails />
        </Suspense>
      ),
      errorElement: <>error</>
    },

    {
      path: "/contact",
      element: (
        <Suspense>
          <Contact />
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

    {
      path: "/event-explorer-profile",
      element: (
        <AuthRoute requiredRole="event explorer" element={<Suspense><EventExplorerProfile /></Suspense>} />
      )
    },

    {
      path: "/my-bookings",
      element: (
        <AuthRoute requiredRole="event explorer" element={<Suspense><MyBookings /></Suspense>} />
      )
    },

    {
      path: "/my-tickets",
      element: (
        <AuthRoute requiredRole="event explorer" element={<Suspense><MyTickets /></Suspense>} />
      )
    },

     {
      path: "/my-events",
      element: (
        <AuthRoute requiredRole="event organizer" element={<Suspense><MyEvents /></Suspense>} />
      )
     },

     {
      path: "/view-event/:_id",
      element: (
        <AuthRoute requiredRole="event organizer" element={<Suspense><ViewEvent /></Suspense>} />
      )
     }
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
