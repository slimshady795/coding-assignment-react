/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ticket } from '@acme/shared-models';
import { notification } from 'antd';
import { useState } from 'react';

type UseTicket = {
  ticket: Ticket | undefined;
  getTicket: (id: string) => void;
  loading: boolean;
  assign: (id: string, userId: string) => Promise<Ticket>;
  loadingAssign: boolean;
  updateStatus: (id: string, status: boolean) => Promise<Ticket>;
  loadingStatus: boolean;
};

const useTicket = (): UseTicket => {
  const [data, setData] = useState<Ticket | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAssign, setLoadingAssign] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

  const getTicket = async (id = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tickets/${id}`);
      const ticket = await res.json();

      setData(ticket);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const assign = async (id = '', userId = '') => {
    setLoadingAssign(true);
    try {
      const res = await fetch(`/api/tickets/${id}/assign/${userId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      notification.success({
        message: `Assigned successfully!`,
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAssign(false);
    }
  };

  const updateStatus = async (id = '', status = false) => {
    setLoadingStatus(true);
    try {
      const res = await fetch(`/api/tickets/${id}/complete`, {
        method: status ? 'put' : 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      notification.success({
        message: `Updated status successfully!`,
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStatus(false);
    }
  };

  return {
    ticket: data,
    getTicket,
    loading,
    assign,
    loadingAssign,
    updateStatus,
    loadingStatus,
  };
};

export default useTicket;
