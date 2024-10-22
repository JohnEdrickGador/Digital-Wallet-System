def wrap_response(respons_code: int, response_message: str, details = None):
    response = {
        "response_code": respons_code,
        "response_message": response_message,
        "details": details
    }

    return response