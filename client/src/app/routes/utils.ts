import { PATHS } from '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyParams = (...args: any[]) => {
  let route = args[0] || '';

  let i = 1;
  while (i < args.length) {
    route = route.replace(/:[a-zA-Z-_]+\??/, args[i]);
    i += 1;
  }
  return route;
};

export const pathToTickets = () => PATHS.TICKETS;

export const pathToTicketDetail = (id = '') =>
  applyParams(PATHS.TICKET_DETAIL, id);
