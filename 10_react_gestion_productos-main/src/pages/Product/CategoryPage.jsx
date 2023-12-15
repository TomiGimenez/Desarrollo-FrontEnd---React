import React, { useState, useEffect } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryForm from "./CategoryForm";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const fetchCategories = async () => {
    try {
      const token = await getAccessTokenSilently();
      let response = await axios.get("https://backend-productos.netlify.app/api/categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Hubo un error al cargar las categorías");
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleShowModal = () => {
    setSelectedCategory(null);
    setShowModal(true);
    fetchCategories();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchCategories();
  };

  const handleEditButtonClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeleteClick = async (category) => {
    const token = await getAccessTokenSilently();
    
    axios
      .delete(`https://backend-productos.netlify.app/api/categorias/${category.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("La categoría se ha eliminado correctamente.");
        fetchCategories();
      })
      .catch((error) => {
        toast.error("Hubo un error al eliminar la categoría.");
        console.error(error);
      });
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <Container>
            <Row>
              <Button onClick={handleShowModal}>Agregar Categoría</Button>
            </Row>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.nombre}</td>
                    <td>
                      <Button
                        className="me-2"
                        onClick={() => handleEditButtonClick(category)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(category)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          {showModal && (
            <CategoryForm
              showModal={showModal}
              handleClose={handleCloseModal}
              category={selectedCategory}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
