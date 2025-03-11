// This function return capitalized string and subscripting any numbers found
function capitalizeString(inputString) {
  if (inputString) {
    return (
      <>
        {inputString.split(/(\d+(?:\.\d+)?)/g).map((part, index) => {
          return !/^\d+(\.\d+)?$/.test(part) ? (
            <span key={index}>{part.toUpperCase()}</span>
          ) : (
            <sub key={index}>{part}</sub>
          );
        })}
      </>
    );
  } else {
    return inputString;
  }
}

export default capitalizeString;
