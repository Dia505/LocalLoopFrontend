import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Login = lazy(() => import("./core/public/login"));

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
  ]

  const router = createBrowserRouter(routes);

  return (
    <>
      <QueryClientProvider client={queryClient}>

        <RouterProvider router={router} />

      </QueryClientProvider>
    </>
  )
}

export default App
