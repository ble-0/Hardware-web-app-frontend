
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const HardwareItem = ({ title, userId, date, details, onClick, onDelete }) => {
    return (
        <Card className="hardware-item" onClick={onClick}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">User ID: {userId}</Card.Subtitle>
                <Card.Text>
                    <strong>Date Acquired:</strong> {date}
                </Card.Text>
                <Card.Text>{details}</Card.Text>
                <Button variant='primary' onClick={onClick}>Update</Button>
                <Button variant='danger' onClick={onDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
};

export default HardwareItem;