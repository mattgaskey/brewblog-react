from flask import request, jsonify
import sqlalchemy as sa
from brewblog import db
from brewblog.beer import bp
from brewblog.models import Beer, Brewery

@bp.route('/api/beers/create', methods=['POST'])
def create_beer():
    data = request.json
    brewery_id = data.get('brewery_id')
    brewery = db.session.scalar(sa.select(Brewery).where(Brewery.id == brewery_id))
    if not brewery:
        return jsonify({'error': f'Brewery with ID {brewery_id} not found.'}), 404

    new_beer = Beer(
        name=data.get('name'),
        description=data.get('description'),
        style=data.get('style'),
        brewery_id=brewery.id
    )
    db.session.add(new_beer)
    db.session.commit()
    return jsonify(new_beer.serialize()), 201

@bp.route('/api/beers/<int:beer_id>/delete', methods=['POST'])
def delete_beer(beer_id):
    beer = db.session.scalar(sa.select(Beer).where(Beer.id == beer_id))
    if beer is None:
        return jsonify({'error': f'Beer with id {beer_id} not found.'}), 404

    brewery_id = beer.brewery_id
    db.session.delete(beer)
    db.session.commit()
    return jsonify({'message': f'Beer {beer.name} deleted successfully.', 'brewery_id': brewery_id}), 200