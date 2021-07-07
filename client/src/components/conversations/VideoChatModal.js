import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {VideoAdd24Regular} from '@fluentui/react-icons';
import VideoApp from '../../VideoChat/VideoApp';
function VideoChatModal ({name}) {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button onClick={onOpenModal}><VideoAdd24Regular  primaryFill="#464775"/></button>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Video Calling : {name}</h2>
        < VideoApp />
      </Modal>
    </div>
  );
};

export default VideoChatModal;