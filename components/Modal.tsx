import React, { useState } from "react";

const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [productImage, setProductImage] = useState("");
  const [imageFile, setImageFile] = useState<string | null>(null);

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductValue(e.target.value);
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductImage(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional chaining to safely access files
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="bg-black text-white text-center p-2 rounded-t-lg">
              <h2 className="text-xl font-bold mb-2">INNOVATION STORE</h2>
              <p className="mb-2">Adicionar Produto</p>
            </div>

            <form className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nome do produto
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={handleProductNameChange}
                  className="w-full px-4 py-2 border-black rounded border-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Valor R$</label>
                <input
                  type="number"
                  value={productValue}
                  onChange={handleProductValueChange}
                  className="w-full px-4 py-2 rounded border-black   border-2"
                />
              </div>
              <div className="mb-4 ">
                <label className="block text-gray-700 mr-2">
                  Foto do produto
                </label>
                <div className="relative flex items-center">
                  <div className="w-48 h-32 rounded-lg border border-gray-300 flex items-center justify-center mb-2 mr-2">
                    {imageFile ? (
                      <img
                        src={imageFile}
                        alt="Product Thumbnail"
                        className="w-full h-full object-cover rounded-lg border-2 border-black"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Thumbnail</span>
                    )}
                  </div>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-gray-200 hover:bg-gray-400 text-black px-2 py-1 rounded text-sm"
                  >
                    Escolher arquivo
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </form>

            <div className="p-4">
              <button
                onClick={() => console.log("Add Item")}
                className="w-2/5 bg-black text-xl  text-white rounded-lg p-3"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
