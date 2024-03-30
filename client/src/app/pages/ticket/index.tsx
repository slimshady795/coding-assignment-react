/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import useTicket from '../../hooks/useTicket';
import { pathToTickets } from '../../routes/utils';
import { Breadcrumb, Typography } from 'antd';

import './style.scss';
import useUsers from '../../hooks/useUsers';
import TicketAssigneeSelect from '../../components/Select/TicketAssigneeSelect';
import TicketStatusSelect from '../../components/Select/TicketStatusSelect';
import Avatar from '../../components/Avatar';

function TicketDetail() {
  const { id = '' } = useParams();

  const {
    ticket,
    getTicket,
    loading,
    updateStatus: updateStatusTicket,
    loadingStatus,
    assign: assignTicket,
    loadingAssign,
  } = useTicket();
  const { users, getUsers } = useUsers();

  useEffect(() => {
    id && getTicket(id);
  }, [id]);

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

  if (loading) {
    return null;
  }
  return (
    <div className="ticket-detail">
      <Breadcrumb
        items={[
          { title: <Link to={pathToTickets()}>Tickets</Link> },
          { title: `${ticket?.id} - ${ticket?.title}` },
        ]}
      />
      <div className="content">
        <div className="content-left">
          <Typography.Title level={3}>{ticket?.title}</Typography.Title>
          <div className="description">
            <Typography.Paragraph strong>Description</Typography.Paragraph>
            <Typography.Text>{ticket?.description}</Typography.Text>
          </div>
        </div>
        <div className="content-right">
          <TicketStatusSelect
            className="update-select"
            placeholder="Status"
            defaultValue={!!ticket?.completed}
            onChange={(value) =>
              updateStatusTicket(ticket?.id as unknown as string, value)
            }
            disabled={loadingStatus}
          />
          <div className="ticket-info">
            <div className="ticket-info-item">
              <Typography.Paragraph strong>Assignee</Typography.Paragraph>
              <TicketAssigneeSelect
                className="update-select"
                showSearch
                placeholder="Assignee"
                defaultValue={ticket?.assigneeId}
                onChange={(value) =>
                  assignTicket(ticket?.id as unknown as string, value)
                }
                options={assigneeOpts}
                disabled={loadingAssign}
              />
            </div>
            <div className="ticket-info-item">
              <Typography.Paragraph strong>Reporter</Typography.Paragraph>
              <Avatar
                data={{
                  id: 10,
                  name: 'Johnny Depp',
                  avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=20',
                }}
                showName
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;
