/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react';
import useTickets from '../../hooks/useTickets';
import useUsers from '../../hooks/useUsers';

import { Button, Table, Typography } from 'antd';
import type { TableProps } from 'antd';

import { Ticket } from '@acme/shared-models';
import { PlusCircleOutlined } from '@ant-design/icons';
import { pathToTicketDetail } from '../../routes/utils';
import { useNavigate } from 'react-router-dom';

import './style.scss';
import CreateTicketModal, {
  CREATE_TICKET_MODAL,
} from '../../components/Modal/CreateTicket';
import { debounce } from '../../utils';
import TicketStatusSelect from '../../components/Select/TicketStatusSelect';
import TicketAssigneeSelect from '../../components/Select/TicketAssigneeSelect';
import useTicket from '../../hooks/useTicket';

export function Tickets() {
  const navigate = useNavigate();

  const [modal, setModal] = useState<{ name?: string; data?: any }>({});
  const [filter, setFilter] = useState({});
  const { tickets, getTickets, loading: loadingTickets } = useTickets();
  const {
    assign: assignTicket,
    loadingAssign,
    updateStatus: updateStatusTicket,
    loadingStatus,
  } = useTicket();
  const { users, getUsers } = useUsers();

  const getTicketsDebounce = useCallback(debounce(getTickets, 300), []);

  useEffect(() => {
    getTicketsDebounce(filter);
  }, [filter]);

  useEffect(() => {
    getUsers();
  }, []);

  const assigneeOpts = useMemo(
    () =>
      users.map((u) => ({
        value: u?.id,
        label: u?.name,
        data: u,
      })),
    [users]
  );

  const onCreate = () => {
    setModal({
      name: CREATE_TICKET_MODAL,
    });
  };

  const columns: TableProps<Ticket>['columns'] = [
    {
      key: 'id',
      title: 'Id',
      render: (item) => (
        <Typography.Link
          underline
          onClick={() => navigate(pathToTicketDetail(item?.id))}
        >
          {item?.id}
        </Typography.Link>
      ),
    },
    {
      key: 'title',
      title: 'Title',
      render: (item) => item?.title,
    },
    {
      key: 'description',
      title: 'Description',
      render: (item) => item?.description,
    },
    {
      key: 'assignee',
      title: 'Assignee',
      render: (item) => (
        <TicketAssigneeSelect
          className="update-select"
          showSearch
          placeholder="Assignee"
          defaultValue={item?.assigneeId}
          onChange={(value) => assignTicket(item?.id, value)}
          options={assigneeOpts}
          disabled={loadingAssign}
        />
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (item) => (
        <TicketStatusSelect
          className="update-select"
          placeholder="Status"
          defaultValue={!!item?.completed}
          onChange={(value) => updateStatusTicket(item?.id, value)}
          disabled={loadingStatus}
        />
      ),
    },
  ];

  const onChangeFilter = (type: string, value: number | string) => {
    setFilter((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <>
      <div className="tickets">
        <h2>Tickets</h2>
        <div className="tickets-body">
          <div className="filter">
            <TicketAssigneeSelect
              className="filter-select"
              showSearch
              maxTagCount={3}
              mode="multiple"
              placeholder="Assignee"
              onChange={(value) => onChangeFilter('assignee', value)}
              options={assigneeOpts}
            />
            <TicketStatusSelect
              className="filter-select"
              maxTagCount={3}
              mode="multiple"
              placeholder="Status"
              onChange={(value: string | number) =>
                onChangeFilter('status', value)
              }
            />
          </div>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={onCreate}
          >
            Create ticket
          </Button>
        </div>
        <Table
          className="tickets-table"
          columns={columns}
          dataSource={tickets}
          pagination={false}
          loading={loadingTickets || loadingAssign || loadingStatus}
        />
      </div>
      {modal?.name === CREATE_TICKET_MODAL && (
        <CreateTicketModal
          open
          onClose={() => setModal({})}
          data={{
            assigneeOpts,
            createSuccess: () => getTicketsDebounce(filter),
          }}
        />
      )}
    </>
  );
}

export default Tickets;
