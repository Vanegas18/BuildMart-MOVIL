import axios from "../axios";

// Obtiene todos los productos
export const getProducts = () => axios.get("productos");