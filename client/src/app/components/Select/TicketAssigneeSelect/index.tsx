import { Select } from 'antd';
import type { SelectProps } from 'antd';

import './style.css';
import Avatar from '../../Avatar';

const TicketAssigneeSelect = (props: SelectProps) => (
  <Select
    {...props}
    optionRender={(opt) => <Avatar data={opt?.data?.['data']} showName />}
    labelRender={(opt) => (
      <Avatar
        data={props?.options?.find((u) => u?.value === opt?.value)?.['data']}
        showName
      />
    )}
  />
);

export default TicketAssigneeSelect;
