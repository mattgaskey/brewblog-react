from flask import request, jsonify
from functools import wraps
from brewblog import require_auth

def require_permission(permission):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.headers.get('Authorization', None)
            if token is None:
                return jsonify({'error': 'Authorization header is missing'}), 401

            try:
                token = token.split()[1]
                claims = require_auth.validate_request(scopes=["openid profile email", permission], request=request)
                permissions = claims.get("permissions", [])
                if permission not in permissions:
                    return jsonify({'error': 'Forbidden: insufficient permissions'}), 403
            except Exception as e:
                return jsonify({'error': f'Invalid token: {str(e)}'}), 403

            return f(*args, **kwargs)
        return decorated_function
    return decorator