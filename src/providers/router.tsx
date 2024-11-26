import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthenticatedLayout } from "@layouts";
import {
  LoginView,
  BalancesView,
  ClientsView,
  EventInfoView,
  EventsView,
  MenuView,
  StaffView,
  StandsView,
  TopUpsView,
  TransactionsView,
  NotFound,
} from "@views";

const router = createBrowserRouter([
  {
    Component: LoginView,
    path: "/login",
  },
  {
    Component: AuthenticatedLayout,
    children: [
      {
        path: "/events",
        Component: EventsView,
      },
      {
        path: "/events/:eventId",
        Component: EventInfoView,
      },
      {
        path: "/events/:eventId/staff",
        Component: StaffView,
      },
      {
        path: "/events/:eventId/menu",
        Component: MenuView,
      },
      {
        path: "/events/:eventId/stands",
        Component: StandsView,
      },
      {
        path: "/events/:eventId/balances",
        Component: BalancesView,
      },
      {
        path: "/events/:eventId/top-ups",
        Component: TopUpsView,
      },
      {
        path: "/events/:eventId/transactions",
        Component: TransactionsView,
      },

      {
        path: "/clients",
        Component: ClientsView,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);

export default router;
