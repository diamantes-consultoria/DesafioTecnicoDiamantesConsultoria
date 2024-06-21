import React, { useState } from "react";
import Image from "next/image";

const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductValue(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("value", productValue);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        onClose();
        setProductName("");
        setProductValue("");
        setImageFile(null);
        setImagePreview(null);
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-full max-w-3xl">
            <div className="bg-black text-white p-4 rounded-t-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1 flex justify-center">
                  <h2 className="text-3xl font-bold">INNOVATION STORE</h2>
                </div>
                <span
                  className="text-white rounded-full px-2 py-1 text-2xl ml-auto cursor-pointer"
                  onClick={onClose}
                >
                  X
                </span>
              </div>
              <p className="text-center text-xl">Adicionar Produto</p>
            </div>

            <form className="p-4 md:p-8 text-black">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nome do produto
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={handleProductNameChange}
                  className="w-full md:w-3/5 px-4 py-2 border-black rounded border-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Valor R$</label>
                <input
                  type="number"
                  value={productValue}
                  onChange={handleProductValueChange}
                  className="w-full md:w-3/5 px-4 py-2 rounded border-black border-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Foto do produto</label>
                <div className="relative flex items-center">
                  <div className="w-32 h-32 md:w-48 md:h-32 rounded-lg border border-gray-300 flex items-center justify-center mb-2 mr-2">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Product Thumbnail"
                        className="w-full h-full object-cover rounded-lg border-2 border-black"
                        width={192}
                        height={128}
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

            <div className="p-4 md:p-8 flex justify-end">
              <button
                onClick={handleAddProduct}
                className="w-2/5 bg-black text-xl text-white rounded-lg p-3"
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
