from flask import jsonify
from brewblog.errors import bp

@bp.app_errorhandler(404)
def not_found_error(error):
    response = {
        "error_code": 404,
        "error_message": "Page not found."
    }
    return jsonify(response), 404

@bp.app_errorhandler(500)
def internal_error(error):
    response = {
        "error_code": 500,
        "error_message": "Internal server error."
    }
    return jsonify(response), 500
