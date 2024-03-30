/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from 'antd';
import useCreateTicket from 'client/src/app/hooks/useCreateTicket';
import Modal from '..';
import TicketAssigneeSelect from '../../Select/TicketAssigneeSelect';

import './style.scss';

export const CREATE_TICKET_MODAL = 'CREATE_TICKET_MODAL';

type CreateTicketModalProps = {
  open: boolean;
  onClose?: () => void;
  data?: any;
};

function CreateTicketModal({ open, onClose, data }: CreateTicketModalProps) {
  const [form] = Form.useForm();

  const { createTicket, loading } = useCreateTicket();

  const onFinish = async (values: any) => {
    try {
      const res = await createTicket(values);
      if (res?.id) {
        onClose?.();
        data?.createSuccess?.();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Create Ticket"
      open={open}
      onOk={form.submit}
      okButtonProps={{ loading }}
      onCancel={onClose}
    >
      <Form
        form={form}
        layout="vertical"
        className="create-ticket-form"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Required field' }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            showCount
            maxLength={100}
            placeholder="Enter description"
            style={{ height: 120, resize: 'none' }}
          />
        </Form.Item>
        <Form.Item
          name="assigneeId"
          label="Assignee"
          rules={[{ required: true, message: 'Required field' }]}
        >
          <TicketAssigneeSelect
            placeholder="Select an assignee"
            onChange={(val) => form.setFieldValue('assigneeId', val)}
            allowClear
            options={data?.assigneeOpts || []}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateTicketModal;
