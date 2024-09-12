            
import React from 'react'
import { Button, Modal } from 'antd';

export default function DeleteModal({msg, onclose, userId, handledelete,modal}) {
  return (
    <>
      <Modal

        title="Delete"
        open={modal}
        onCancel={onclose}
        footer={[
          <Button key="back" onClick={onclose}>
         Cancel
          </Button>,
          <Button key="submit" type="primary"  onClick={handledelete}>
            confirm
          </Button>,
        
        ]}
      >
             <p>{msg}{ userId}</p>
     
      </Modal>
        </>
    
  )
}





