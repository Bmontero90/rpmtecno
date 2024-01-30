import { Button } from "@mui/material";
import jsPDF from "jspdf"; 

export default function ImprimirOrden() {
    const generarPDF = () => {
        // Crear una instancia de jsPDF
        const doc = new jsPDF();
       // Agregar contenido al PDF
       doc.text('Detalle de la Orden', 10, 10);
       // Aquí puedes agregar más contenido utilizando los métodos de jsPDF
     
       // Guardar o visualizar el PDF
       doc.save('detalle_orden.pdf');
       
      };
      
    return(
        <>
        <Button onClick={generarPDF}>Generar PDF</Button>
        </>


    )
}