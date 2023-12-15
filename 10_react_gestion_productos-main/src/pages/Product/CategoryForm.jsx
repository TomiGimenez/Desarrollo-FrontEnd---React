import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryForm = ({ showModal, handleClose, category }) => {
  const [categoryName, setCategoryName] = useState(category ? category.nombre : "");

  const handleSave = async () => {
    try {
      if (category) {
        // Modificar categoría existente
        await axios.put(
          `https://backend-productos.netlify.app/api/categorias/${category.id}`,
          {
            nombre: categoryName,
          }
        );
        toast.success("Categoría modificada correctamente.");
      } else {
        // Crear nueva categoría
        await axios.post("https://backend-productos.netlify.app/api/categorias", {
          nombre: categoryName,
        });
        toast.success("Categoría creada correctamente.");
      }
      handleClose();
    } catch (error) {
      toast.error("Hubo un error al guardar la categoría.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://backend-productos.netlify.app/api/categorias/${category.id}`);
      toast.success("Categoría eliminada correctamente.");
      handleClose();
    } catch (error) {
      toast.error("Hubo un error al eliminar la categoría.");
      console.error(error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{category ? "Modificar Categoría" : "Crear Categoría"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="categoryName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
        {category && (
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryForm;
