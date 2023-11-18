import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import img1 from "../multimedia/adidas_logo.png";
import { useDispatch, useSelector } from "react-redux";
import CategoriesPanel from "./CategoriesPanel";
import { getCategoryByParent } from "../store/slices/categories/categoryDetailSlice";
import { getCategories } from "../store/slices/categories/categoriesListSlice";

const Header = ({ filter }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const [openCategoryPanel, setOpenCategoryPanel] = useState(false);
  const [openCategoryPanelDetail, setOpenCategoryPanelDetail] = useState(false);
  const categories = Object.values(useSelector(state => state.categoriesList.entities));
  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container className="flex-row-reverse flex-lg-row">
          <Navbar.Brand href="/">
            <img id="logo_header" className="img-logo w-3 h-3" src={img1} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end gap-5"
          >
            <Nav className="gap-2 m-auto">
              {categories.map((category) => (
                <Nav.Link
                  href={`#/products/${category.id}`}
                  key={category.id}
                  className="fw-semibold text-center"
                  onMouseOver={() => {
                    dispatch(getCategoryByParent(category.id)).then((res) => {
                      setOpenCategoryPanel(true);
                    });
                  }}
                  onMouseOut={() => {
                    setTimeout(() => {
                      setOpenCategoryPanel(false);
                    }, 800);
                  }}
                >
                  {category.name}
                </Nav.Link>
              ))}
              <NavDropdown
                title="Servicios"
                className="fw-semibold text-center"
              >
                <NavDropdown.Item href="#/eRenovables">
                  Energias renovables
                </NavDropdown.Item>
                <NavDropdown.Item href="#/mElectrico">
                  Mantenimiento eléctrico
                </NavDropdown.Item>
                <NavDropdown.Item href="#/cableado">
                  Cableado estructurado
                </NavDropdown.Item>
                <NavDropdown.Item href="#/disenio">
                  Diseño y contrucción
                </NavDropdown.Item>
                <NavDropdown.Item href="#/UPS">
                  UPS y generadores
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/services">
                  Todos los servicios
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex gap-0 gap-sm-2 d-none d-lg-flex">
              <Button variant="none" onClick={() => { }}>
                <i className="fa-regular fa-user fs-5"></i>
              </Button>
              <Button variant="none" onClick={() => { }}>
                <i className="fa-solid fa-bag-shopping fs-5"></i>
              </Button>
              <Button variant="none" onClick={() => { }}>
                <i className="fa-solid fa-cart-shopping fs-5"></i>
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {openCategoryPanelDetail ? <CategoriesPanel setOpenCategoryPanelDetail={setOpenCategoryPanelDetail} /> :
        (openCategoryPanel &&
          <CategoriesPanel setOpenCategoryPanelDetail={setOpenCategoryPanelDetail} />)
      }
      {/*<ShoppingCart show={show} handleClose={handleClose} />*/}
    </>
  );
};

export default Header;
