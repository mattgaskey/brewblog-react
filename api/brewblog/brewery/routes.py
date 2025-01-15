from flask import request, jsonify
import sqlalchemy as sa
from brewblog import db
from brewblog.brewery import bp
from brewblog.models import Brewery
from brewblog.auth_decorator import require_permission

@bp.route('/api/breweries')
@require_permission('get:breweries')
def breweries():
    breweries = db.session.scalars(sa.select(Brewery)).all()

    areas = {}
    for brewery in breweries:
        area = (brewery.city, brewery.state)
        if area not in areas:
            areas[area] = []
        areas[area].append(brewery)

    areas_list = [{'city': city, 'state': state, 'breweries': [brewery.serialize() for brewery in breweries]} for (city, state), breweries in areas.items()]

    return jsonify(areas_list)

@bp.route('/api/breweries/create', methods=['POST'])
@require_permission('create:breweries')
def create_brewery():
    data = request.json
    brewery_id = data.get('id')

    # Check if the brewery already exists
    existing_brewery = db.session.scalar(sa.select(Brewery).where(Brewery.id == brewery_id))
    if existing_brewery:
        return jsonify({'error': f'Brewery with ID {brewery_id} already exists.'}), 400

    new_brewery = Brewery(
        id=brewery_id,
        name=data.get('name'),
        address=data.get('address'),
        city=data.get('city'),
        state=data.get('state'),
        phone=data.get('phone'),
        website_link=data.get('website_link')
    )
    db.session.add(new_brewery)
    db.session.commit()
    return jsonify(new_brewery.serialize()), 201

@bp.route('/api/breweries/<string:brewery_id>')
@require_permission('get:breweries')
def show_brewery(brewery_id):
    brewery = db.session.scalar(sa.select(Brewery).where(Brewery.id == brewery_id))
    if brewery is None:
        return jsonify({'error': f'Brewery with id {brewery_id} not found.'}), 404

    brewery_data = brewery.serialize()

    return jsonify(brewery_data)

@bp.route('/api/breweries/<string:brewery_id>/edit', methods=['POST', 'PATCH'])
@require_permission('edit:breweries')
def edit_brewery(brewery_id):
    brewery = db.session.scalar(sa.select(Brewery).where(Brewery.id == brewery_id))
    if brewery is None:
        return jsonify({'error': f'Brewery with id {brewery_id} not found.'}), 404

    data = request.json
    required_fields = ['name', 'address', 'city', 'state', 'phone', 'website_link']

    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    brewery.name = data['name']
    brewery.address = data['address']
    brewery.city = data['city']
    brewery.state = data['state']
    brewery.phone = data['phone']
    brewery.website_link = data['website_link']
    db.session.commit()

    return jsonify(brewery.serialize())