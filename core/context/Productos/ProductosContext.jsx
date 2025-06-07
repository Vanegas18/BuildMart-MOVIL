import { createContext, useState, useEffect } from "react";
import { getProducts } from "../../api/Productos/productos";

export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => setProductos(response.data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <ProductosContext.Provider value={{ productos }}>
      {children}
    </ProductosContext.Provider>
  );
};