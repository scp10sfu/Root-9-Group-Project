import Toast from '../Components/Toast';

const [toastVisible, setToastVisible] = useState(false);
const [toastMessage, setToastMessage] = useState('');
const [toastType, setToastType] = useState('');

const showToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setToastVisible(true);
  
    // Automatically hide the toast after a certain duration (e.g., 3000 milliseconds)
    setTimeout(() => {
      setToastVisible(false);
      setToastMessage(null);
      setToastType(null);
    }, 1500);

    return {setToastMessage};
  };