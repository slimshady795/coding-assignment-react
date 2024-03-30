import { User } from '@acme/shared-models';
import { useState } from 'react';

type UseUsers = {
  users: User[];
  getUsers: () => void;
  loading: boolean;
};

const useUsers = (): UseUsers => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const users = await res.json();

      setData(users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    users: data,
    getUsers,
    loading,
  };
};

export default useUsers;
