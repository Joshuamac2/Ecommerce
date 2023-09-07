import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './styles/FormStyles.css';
import React, {useState} from 'react';
import axios from 'axios';

function Message() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/send-message', {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            });

            if (response.status === 200) {
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="centered-form">
            <Form className="form-group" onSubmit={handleSubmit}>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control 
                    size="lg" 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} 
                    />
                </Form.Group>
                <br />
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    size="lg"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}  
                    />
                </Form.Group>
                <br />
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control 
                    size="lg"
                    type="subject"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                     />
                </Form.Group>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control 
                    size="lg" 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ height: '150px' }}
                     />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )

}

export default Message;