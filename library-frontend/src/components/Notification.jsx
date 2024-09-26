import Container from 'react-bootstrap/esm/Container'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

const Notification = ({ noty }) => {
  if (!noty) {
    return null
  }

  const ShowToast = ({ header, message, type }) => {
    return (
      <ToastContainer
        className='p-3 position-fixed'
        position='top-center'
        style={{ zIndex: 1 }}>
        <Toast bg={type}>
          <Toast.Header closeButton={false}>
            <strong className='me-auto'>{header}</strong>
          </Toast.Header>
          <Toast.Body className='text-white'>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    )
  }

  return (
    <Container>
      {noty.type === 'error' ? (
        <ShowToast header='Error!' message={noty.message} type='danger' />
      ) : (
        <ShowToast header='Done!' message={noty.message} type='success' />
      )}
    </Container>
  )
}

export default Notification
