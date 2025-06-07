const styles = {
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    minHeight: 200,
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginTop: 8, // Separación extra del nombre del producto
  },
  oldPrice: {
    fontSize: 14,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D97706",
  },
  stock: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 3,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  button: {
    backgroundColor: "#3B82F6",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16, // Más espacio debajo del stock
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  dropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  activeOption: {
    backgroundColor: "#BFDBFE",
  },
  inactiveOption: {
    backgroundColor: "#E5E7EB",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    marginTop: 120, // Lo coloca más abajo
  },
  emptyText: {
    fontSize: 16,
    color: "#9CA3AF",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  clearButton: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 6,
    marginTop: 20, // Espaciado extra debajo del mensaje
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
};

export default styles;