import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface AlertMessagProps{
  variant?:string,
  header?:string,
  content?:string
}
function AlertMessage({variant='success',header,content}:AlertMessagProps) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {/* <Alert.Heading>{header}</Alert.Heading> */}
        
          {content}
      </Alert>
    );
  }
  return null
}

export default AlertMessage;