import { User } from '@acme/shared-models';
import { UserOutlined } from '@ant-design/icons';
import { Avatar as AntAvatar, Typography } from 'antd';

import './style.css';

export interface AvatarProps {
  data?: User;
  showName?: boolean;
}

function Avatar({ data, showName = true }: AvatarProps) {
  const renderImg = (
    <AntAvatar src={data?.avatar || ''} size={24} icon={<UserOutlined />} />
  );

  if (showName && data?.name) {
    return (
      <div className="wrapper-avatar">
        {renderImg}
        <Typography.Text>{data?.name}</Typography.Text>
      </div>
    );
  }
  return renderImg;
}

export default Avatar;
