module.exports = {
  getError(error) {
    if (error.response == undefined)
      return error;
    
    switch (error.response.status) {
      case 400:
        return 'This element already exists.';
      case 401:
        return 'You need a valid account first. Use "login" command to start a session.';
      case 406:
        return 'Invalid parameters.';
      default:
        return 'Something went wrong';
    }
  }
};
