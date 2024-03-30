import TicketDetail from '../pages/ticket';
import Tickets from '../pages/tickets';

export const PATHS = {
  TICKETS: '/ticket',
  TICKET_DETAIL: '/ticket/:id',
};

export const ROUTES = [
  {
    path: PATHS.TICKETS,
    element: Tickets,
  },
  {
    path: PATHS.TICKET_DETAIL,
    element: TicketDetail,
  },
];
