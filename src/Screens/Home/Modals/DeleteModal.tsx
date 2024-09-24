            
import React from 'react'
import { Button, Modal } from 'antd';


export default function DeleteModal({
  msg, onclose, userId, handledelete, modal
}: {
  msg: string;
  onclose: () => void;
  userId: string;
  handledelete: () => void;
  modal: boolean;
}) {

  console.log(userId);
  return (
      <Modal
          title="Delete"
          open={modal}
          onCancel={onclose}
          footer={[
              <Button key="back" onClick={onclose}>Cancel</Button>,
              <Button key="submit" type="primary" onClick={handledelete}>Confirm</Button>,
          ]}
      >
          <p>{msg} {userId}</p>
      </Modal>
  );
}






