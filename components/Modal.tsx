import { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [productImage, setProductImage] = useState("");

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="bg-black flex items-center flex-col flex-wrap mb-6">
              <h2 className="text-xl font-bold mb-2">INNOVATION STORE</h2>
              <p className="mb-2">Adicionar Produto</p>
            </div>

            <form>
              <label>Nome do produto</label>
              <input
                type="text"
                placeholder="Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
              <label>Valor R$</label>
              <input
                type="number"
                placeholder="Value"
                value={productValue}
                onChange={(e) => setProductValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
              <label>Foto do produto</label>
              <input
                type="text"
                placeholder="Image URL"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
              />
            </form>

            <button
              onClick={() => console.log("Add Item")}
              className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
