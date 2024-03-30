/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ticket } from '@acme/shared-models';
import { useState } from 'react';
import { generateQueryParam } from '../utils/url';

type TParams = {
  assignee?: string;
  status?: boolean;
};

type UseTickets = {
  tickets: Ticket[];
  getTickets: (params: TParams) => void;
  loading: boolean;
};

const useTickets = (): UseTickets => {
  const [data, setData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getTickets = async (params: TParams) => {
    setLoading(true);
    try {
      const res = await fetch('/api/tickets' + generateQueryParam(params));
      const tickets = await res.json();

      setData(tickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    tickets: data,
    getTickets,
    loading,
  };
};

export default useTickets;
