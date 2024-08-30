import 'bootstrap-icons/font/bootstrap-icons.css';

function Alert({message, success}) {
  if (message === '' && success === ''){
    return null;
  }
  if (success){
    return (
      <div className="alert alert-success">
        {message}
      </div>
    );
  } else {
    return (
      <div className="alert alert-danger">
        {message}
      </div>
    );
  }
}

export default Alert;
