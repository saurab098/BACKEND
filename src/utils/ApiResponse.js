class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.data = String;
    this.statusCode = statusCode;
    this.message = message;
    this.success = ststusCode < 400;
  }
}
