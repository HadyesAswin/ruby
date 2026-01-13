import { useState } from "react";
import Modal, { ModalBody, ModalFooter } from '../Modal'
import PropTypes from 'prop-types';

// Components
import Button, { SecondaryButton } from '../Button';

// Services
import { updateSubscriber } from "../../services/subscriber";

const SubscriberStatusModal = (props) => {
  const { isOpen, onSuccess, onClose, subscriberId, status } = props;
  const [isDeleting, setIsDeleting] = useState(false)

  const onUpdate = () => {
  const payload = {
      status: status === 'subscribed' ? 'unsubscribed' : 'subscribed'
    }

    setIsDeleting(true)
    updateSubscriber(subscriberId, payload)
      .then(() => {
        onSuccess() // refresh the list
      })
      .catch((payload) => {
  //       const error = payload?.response?.data?.message || 'Something went wrong'
  //       alert(error)  // show notification
  //       console.error(error)
  //       if (props.onError) {
  //       props.onError(error);
  // }
          const error =
            payload?.response?.data?.errors?.join(', ') ||
            payload?.response?.data?.message ||
            'Something went wrong';

          console.error(error);

          if (props.onError) {
            props.onError(error);
          }
      })
      .finally(() => {
        setIsDeleting(false)
      })
  }


  // const modalTitleText = status === 'active' ? 
  //   "Unsubscribe" : "Resubscribe"
  // const messageBodyText = status === 'active' ? 
  //   "Are you sure you'd like to unsubscribe this subscriber?" :
  //   "Are you sure you'd like to resubscribe this subscriber?"
  // const buttonText = status === 'active' ? 
  //   "Unsubscribe" : "Resubscribe"
  const modalTitleText = status === 'subscribed' ? "Unsubscribe" : "Resubscribe"
  const messageBodyText = status === 'subscribed'
    ? "Are you sure you'd like to unsubscribe this subscriber?"
    : "Are you sure you'd like to resubscribe this subscriber?"
  const buttonText = modalTitleText


  return (
    <Modal modalTitle={modalTitleText} showModal={isOpen} onCloseModal={onClose}>
      <>
        <ModalBody>
          {messageBodyText}
        </ModalBody>
        <ModalFooter>
          <SecondaryButton
            className="mx-2"
            onClick={onClose}
          >
            Cancel
          </SecondaryButton>
          <Button
            type="primary"
            loading={isDeleting}
            onClick={onUpdate}
          >
            {buttonText}
          </Button>
        </ModalFooter>
      </>
    </Modal>
  );
};

SubscriberStatusModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  subscriberId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.string
}

export default SubscriberStatusModal;
