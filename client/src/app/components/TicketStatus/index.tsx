import { Ticket } from '@acme/shared-models';
import { Tag } from 'antd'; 

import './style.css';

export interface TicketProps {
  data?: Ticket;
}

function TicketStatus({ data }: TicketProps) {
  if (data?.completed) {
    return <Tag color="green">Completed</Tag>;
  }
  return <Tag color="gray">Not Started</Tag>;
}

export default TicketStatus;
