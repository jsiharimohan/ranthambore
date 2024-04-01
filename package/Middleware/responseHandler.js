class ResponseHandler {
 
  customResponse = (res, response, statusCode) => res
      .status(statusCode || 200)
      .send(response)
      .end();

  successWithProperty = (res, message, response, statusCode) => res
      .status(statusCode || 200)
      .send(
        Object.assign(
          {
            message: message || 'Success',
            success: true,
            error: false,
            data: null,
          },
          response,
        ),
      )
      .end();

  errorWithProperty = (res, message, response, statusCode) => res
      .status(statusCode || 200)
      .send(
        Object.assign(
          {
            message: message || 'Error',
            success: false,
            data: null,
          },
          response,
        ),
      )
      .end();
}

module.exports = ResponseHandler;