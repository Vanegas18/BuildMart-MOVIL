const styles = {
  // Card principal más compacta
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    height: 300, // Reducido de 395 a 300
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
  },

  // Card para ofertas más compacta
  cardOnSale: {
    flex: 1,
    margin: 8,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    elevation: 12,
    shadowColor: "#1E40AF",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    height: 300, // Reducido de 395 a 300
    position: "relative",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#DBEAFE",
  },

  // Contenedor de imagen optimizado
  imageContainer: {
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
  },

  image: {
    width: 100, // Reducido de 120 a 100
    height: 100, // Reducido de 120 a 100
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
  },

  imageOnSale: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#DBEAFE",
    borderWidth: 2,
    borderColor: "#3B82F6",
  },

  // Contenedor de información del producto
  productInfo: {
    flex: 1,
    padding: 16,
    paddingTop: 12,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 14, // Reducido de 16 a 14
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    lineHeight: 18, // Reducido de 22 a 18
    marginBottom: 8,
  },

  titleOnSale: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1E40AF",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 8,
  },

  // Contenedor de precios más compacto
  priceContainer: {
    alignItems: "center",
    marginBottom: 8,
  },

  priceContainerOnSale: {
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  // Fila de precios para ofertas
  priceRow: {
    alignItems: "center",
  },

  price: {
    fontSize: 16, // Reducido de 18 a 16
    fontWeight: "600",
    color: "#1E293B",
  },

  oldPrice: {
    fontSize: 13, // Reducido de 16 a 13
    color: "#64748B",
    textDecorationLine: "line-through",
    fontWeight: "500",
  },

  offerPrice: {
    fontSize: 17, // Reducido de 20 a 17
    fontWeight: "800",
    color: "#1E40AF",
    marginTop: 2,
  },

  // Fila inferior con stock y botón
  bottomRow: {
    flexDirection: "flex-column",
    alignItems: "center",
  },

  stock: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    flex: 1,
  },

  stockOnSale: {
    fontSize: 12,
    color: "#1E40AF",
    fontWeight: "700",
    flex: 1,
  },

  // Botón más compacto
  button: {
    backgroundColor: "#1E40AF",
    paddingVertical: 8, // Reducido de 12 a 8
    paddingHorizontal: 12, // Reducido de 16 a 12
    borderRadius: 8, // Reducido de 12 a 8
    alignItems: "center",
    elevation: 3,
    shadowColor: "#1E40AF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    minWidth: 70,
  },

  buttonOnSale: {
    backgroundColor: "#1E40AF",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#1E40AF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    minWidth: 80,
    marginBottom: 42,
  },

  buttonText: {
    fontSize: 12, // Reducido de 14 a 12
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },

  buttonTextOnSale: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // Badge de descuento más pequeño
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#1E40AF",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    elevation: 10,
    shadowColor: "#1E40AF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    zIndex: 10,
  },

  discountText: {
    color: "#FFFFFF",
    fontSize: 10, // Reducido de 12 a 10
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  // Estilos para dropdown
  dropdown: {
    position: "absolute",
    top: 60,
    right: 16,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    elevation: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    minWidth: 160,
  },

  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },

  activeOption: {
    backgroundColor: "#DBEAFE",
    borderWidth: 1,
    borderColor: "#3B82F6",
  },

  inactiveOption: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E40AF",
    textAlign: "center",
  },

  // Contenedor vacío
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 32,
  },

  emptyText: {
    fontSize: 18,
    color: "#64748B",
    marginTop: 16,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 24,
  },

  clearButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#1E40AF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  clearButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  // Estilos de paginación
  paginationContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12, // Reducido de 16 a 12
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  paginationButton: {
    width: 36, // Reducido de 40 a 36
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  paginationButtonDisabled: {
    backgroundColor: "#F1F5F9",
    borderColor: "#E2E8F0",
  },

  paginationNumbers: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12, // Reducido de 16 a 12
    gap: 6, // Reducido de 8 a 6
  },

  paginationNumber: {
    width: 32, // Reducido de 36 a 32
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  paginationNumberActive: {
    backgroundColor: "#1E40AF",
    borderColor: "#1E40AF",
  },

  paginationDots: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },

  paginationNumberText: {
    fontSize: 13, // Reducido de 14 a 13
    fontWeight: "600",
    color: "#64748B",
  },

  paginationNumberTextActive: {
    color: "#FFFFFF",
  },
};

export default styles;
