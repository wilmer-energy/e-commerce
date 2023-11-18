import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsByParent } from '../store/slices/items/itemsListSlice';

const Products = () => {
    const dispatch = useDispatch();
    const items = Object.values(useSelector(state => state.itemsList.entities));
    console.log(items);
    const { category_id } = useParams();
    useEffect(() => {
        if (category_id) {
            dispatch(getItemsByParent(category_id));
        }
    }, [category_id]);
    return (
        <div>
            Listado de productos {category_id}
            {items.map((item) => (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e12330db31674b09929b82834f7ea15f_9366/HOODIE_Negro_IW3648_23_hover_model.jpg" />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Products;