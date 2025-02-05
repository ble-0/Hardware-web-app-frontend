
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "./auth";
import HardwareItem from "./Hardware"; 


const LoggedinHardware = () => {
  const [hardwares, setHardwares] = useState([]);
  const [show, setShow] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [hardwareId, setHardwareId] = useState(0); 

  useEffect(() => {
    getAllHardwares();
  }, []);

  const getAllHardwares = () => {
    fetch('/hardware/hardware')
      .then((res) => res.json())
      .then(data => setHardwares(data))
      .catch(err => console.error("Error fetching hardwares:", err));
  };

  const closeModal = () => setShow(false);

  const showModal = (id) => {
    setHardwareId(id);
    setShow(true);
    
    const hardware = hardwares.find(hardware => hardware.id === id);
    if (hardware) {
      setValue('title', hardware.title);
      setValue('destination', hardware.destination);
      setValue('details', hardware.details);
      setValue('date', hardware.date);
    }
  };

  const updateHardware = (data) => {
    console.log("Updating hardware:", data);
    
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    let access_token = "";
  
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        access_token = parsedToken.access_token;
      } catch (error) {
        console.error("Error parsing token:", error);
        return;
      }
    }
  
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    };
  
    fetch(`/hardware/hardware/${hardwareId}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Error: ${res.status} - ${text}`);
          });
        }
        return res.json(); // Only parse JSON if response is valid
      })
      .then((data) => {
        console.log("Updated hardware data:", data);
        getAllHardwares();
        closeModal();
      })
      .catch((err) => console.error("Error updating hardware:", err));
  };

  const deleteHardware = () => {
    console.log("Deleting hardware with ID:", hardwareId);
    let token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
    let access_token = "";

    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        access_token = parsedToken.access_token;
      } catch (error) {
        console.error("Error parsing token:", error);
        return;
      }
    }

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    fetch(`/hardware/hardware/${hardwareId}`, requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete hardware");
        }
        return res.text(); 
      })
      .then(() => {
        console.log("Hardware deleted successfully");
        getAllHardwares();
        closeModal();
      })
      .catch((err) => console.error("Error deleting hardware:", err));
  };

  return (
    <div className="hardwares container"
      style={{
        backgroundImage: "url('public/hardwarepic.jpeg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        height: "100vh"
      }}
    >
      <Modal show={show} size="lg" onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Hardware</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" {...register('title', { required: true, maxLength: 50 })} />
              {errors.title && <p style={{ color: 'red' }}><small>Title is required</small></p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Destination</Form.Label>
              <Form.Control type="text" placeholder="Enter destination" {...register('destination', { required: true })} />
              {errors.destination && <p style={{ color: 'red' }}><small>Destination is required</small></p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Enter details" {...register('details', { required: true })} />
              {errors.details && <p style={{ color: 'red' }}><small>Details are required</small></p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" {...register('date', { required: true })} />
              {errors.date && <p style={{ color: 'red' }}><small>Date is required</small></p>}
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit(updateHardware)}>Update Hardware</Button>
            <Button variant="danger" className="ms-2" onClick={deleteHardware}>Delete</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h1>List of Hardwares</h1>
      {Array.isArray(hardwares) && hardwares.length > 0 ? (
        hardwares.map((hardware) => (
          <hardware
            key={hardware.id} 
            title={hardware.title} 
            destination={hardware.destination} 
            date={hardware.date} 
            description={hardware.details} 
            onClick={() => showModal(hardware.id)} 
            onDelete={() => deleteHardware(hardware.id)} 
          />
        ))
      ) : (
        <p>No hardwares available.</p>
      )}
    </div>
  );
};

const LoggedoutHardware = () => {
  return (
    <div className="home container"
      style={{
        backgroundImage: "url('/public/hardwarepic.jpeg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        height: "100vh"
      }}
    >
      <h1>Welcome to Hardware Management Page</h1>
      <p>Sign in to view your hardwares or Sign Up to start managing</p>
      <Link to='/signup' className="btn btn-primary">Get Started</Link>
    </div>
  );
};

const HardwarePage = () => {
  const [logged] = useAuth();

  return (
    <div>
      {logged ? <LoggedinHardware /> : <LoggedoutHardware />}
    </div>
  );
};

export default HardwarePage;