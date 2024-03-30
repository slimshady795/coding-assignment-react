/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ticket } from '@acme/shared-models';
import { notification } from 'antd';
import { useState } from 'react';

type UseCreateTicket = {
  loading: boolean;
  createTicket: (payload: any) => Promise<Ticket>;
};

const useCreateTicket = (): UseCreateTicket => {
  const [loading, setLoading] = useState<boolean>(false);

  const createTicket = async (payload: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/tickets', {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      notification.success({ message: 'Created successfully!' });
      return await res.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createTicket,
    loading,
  };
};

export default useCreateTicket;
