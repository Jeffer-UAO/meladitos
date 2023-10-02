import { useState } from "react";


export function useWhatsApp() {

    const [selectedItem, setSelectedItem] = useState(null);

    const items = ['+573107617780', '+573108937275', '+573226630481'];
    const seller = [ 'DANNA', 'SANTIAGO', 'VIVÍANA']

    const handleItemClick = (index) => {
        setSelectedItem(index);
      };

 
  const generateWhatsAppLink = (phoneNumber, message) => {
    const url = `https://wa.me/${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    return `${url}?text=${encodedMessage}`;
  };

  return {
    items,
    seller,
    selectedItem,
    handleItemClick,
    generateWhatsAppLink,
  };
}
