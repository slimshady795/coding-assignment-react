/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ticket } from '@acme/shared-models';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { TICKET_STATUS_OPTIONS } from 'client/src/app/consts';
import TicketStatus from '../../TicketStatus';

import './style.css';

const TicketStatusSelect = (props: SelectProps) => (
  <Select
    {...props}
    options={TICKET_STATUS_OPTIONS as any}
    optionRender={(opt) => (
      <TicketStatus data={{ completed: !!opt?.value } as Ticket} />
    )}
    labelRender={(opt) => (
      <TicketStatus data={{ completed: !!opt?.value } as Ticket} />
    )}
  />
);

export default TicketStatusSelect;
