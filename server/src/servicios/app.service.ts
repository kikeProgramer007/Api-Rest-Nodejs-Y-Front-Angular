import { join } from 'path';
const PDFDocument = require('pdfkit-table')
// var sf = require('pdfkit')
const fs = require("fs");
export class AppService {
    
  async pdfRangoFechas(lista:any,usuario:string):Promise<Buffer>{
    const pdfBuffer:Buffer = await new Promise(resolve =>{
        //Creacion del document
        const doc= new PDFDocument({
            size:"LETTER",
            bufferPages:true,
            autoFirstPage: false,//para que no cree automaticamente una pagina
            margins: {
              top: 50, // Ajusta el margen superior
              bottom: 50, // Ajusta el margen inferior
              left: 50, // Ajusta el margen izquierdo
              right: 50 // Ajusta el margen derecho
          }
        })
    
        // Aquí el contenido del PDF
        let pageNumber = 0;
        doc.on('pageAdded', () => {
            pageNumber++;

            if (pageNumber > 0) {
                // Dibujar el logo en la parte superior derecha
                doc.image(join(process.cwd(), "asset/img/logo1.png"), doc.page.width - 100, 18, { fit: [55, 55], align: 'center' });
                
                // Dibujar el título en el pie de página, centrado y por encima de la línea
                doc.fontSize(16)
                    .text(`Reporte de Ventas`, {
                        width: doc.page.width - 100,
                        align: 'center',
                        baseline: 'bottom',
                        y: doc.page.height - 25 // Ajustar la posición del texto para que esté justo encima de la línea
                    });
            }
        });


        doc.addPage();
        doc.fontSize(10);
        doc.font('Times-BoldItalic').text(`Comida Express`, {
          width: doc.page.width - 100,
          align: 'left'
        });

        // Mover hacia arriba para evitar salto de línea
        doc.moveUp();
        doc.font('Helvetica').fontSize(9).text('Fecha: ' + new Date().toLocaleDateString(), {
          width: doc.page.width - 100,
          align: 'right'
        });


      // Establece la fuente y el tamaño para "Usuario: "
      doc.font('Times-BoldItalic').fontSize(10).text('Usuario: ', {
        continued: true,
        align: 'left'
      }).font('Times-Italic').text(`${usuario}`);


        doc.moveDown(1);

        const table2 = {
          headers: [
            // { label:"Cod. Contrato", property: 'id_contrato',headerColor:"#000000",backgroundColor:'red',align:"center",width: 60, renderer: null },
            { label:"Fecha", property: 'fechaventa', headerColor:"#000000",headerOpacity:1,columnColor:'#FFFFFF',align:"center",width: 80, renderer: null },
            { label:"Hora", property: 'hora', headerColor:"#000000",headerOpacity:1,columnColor:'#FFFFFF',align:"center",width: 80, renderer: null },
            { label:"Usuario", property: 'username',headerColor:"#000000",headerOpacity:1,align:"center", width: 136 , renderer: null }, 
            { label:"Cliente", property: 'nombre',headerColor:"#000000",headerOpacity:1,align:"center", width: 122, renderer: null }, 
            { label:"Monto", property: 'monto',headerColor:"#000000",headerAlign:'center',headerOpacity:1,align:"right", width: 95, renderer: (value:any, indexColumn:any, indexRow:any, row:any) => { return `Bs ${Number(value).toFixed(2)}` } },
          ],
          datas: lista 
        };
        
        doc.table(table2, {
          prepareHeader: () => {
            doc.font("Helvetica-Bold").fontSize(8);
            // doc.rect(doc.page.margins.left, doc.y, doc.page.width - doc.page.margins.left - doc.page.margins.right, doc.currentLineHeight())
            //     .fill('#000000'); // Color blanco para el fondo del encabezado
            doc.fillColor('#FFFFFF'); // Color blanco para el texto del encabezado
        },
          prepareRow: (row:any, indexColumn:any, indexRow:any, rectRow:any) => {
          doc.font("Helvetica").fontSize(8);
          doc.fillColor('#333'); // Cambiar color de texto de las filas
          indexColumn === 0 && doc.addBackground(rectRow, 'white', 0.15);
        },
        });
  
        // Usando reduce para sumar MontoTotal
        let totalMonto = lista.reduce((total:number, item:any) => {
          return total + parseFloat(item.monto);
        }, 0);

        doc.font("Helvetica-Bold").text(`Total: Bs. ${totalMonto.toFixed(2)}`, {
            width: doc.page.width - 100,
            align: 'right'
        });

        //finalizacion del document
        const buffer: Uint8Array[] = []; // Declarar explícitamente el tipo
        doc.on('data', buffer.push.bind(buffer))
        doc.on('end', () => {
            const data = Buffer.concat(buffer)
            resolve(data)
        })

        doc.end()
    })
    return pdfBuffer;
}


    async generatePDF(lista:any,venta:any):Promise<Buffer>{
      const pdfBuffer:Buffer = await new Promise(resolve =>{
      // Dimensiones del ticket en puntos (1 mm ≈ 2.83465 puntos)
      const width = 80 * 2.83465; // 80 mm en puntos
      const height = 200 * 2.83465; // 200 mm en puntos

      // Creación del documento
      const doc = new PDFDocument({
        size: [width, height],
        bufferPages: true,
        autoFirstPage: false, // para que no cree automáticamente una página
        margins: {
          top: 10, // Ajusta el margen superior
          bottom: 10, // Ajusta el margen inferior
          left: 10, // Ajusta el margen izquierdo
          right: 10 // Ajusta el margen derecho
        }
      });

   // Aquí el contenido del PDF
   let pageNumber = 0;
   doc.on('pageAdded', () => {
     pageNumber++;
     let bottom = doc.page.margins.bottom;
     doc.moveDown(1);
     if (pageNumber > 0) {
       // Dibujar el logo en la parte superior derecha
       doc.image(join(process.cwd(), "asset/img/logo1.png"), doc.page.width - 34, 5, { fit: [28, 28], align: 'center' });

       // Dibujar la línea en la parte superior
       doc.moveTo(10, 55)
         .lineTo(doc.page.width - 10, 55)
         .stroke();

       // Dibujar la línea en el pie de página
       doc.moveTo(10, doc.page.height - 20)
         .lineTo(doc.page.width - 10, doc.page.height - 20)
         .stroke();

       // Dibujar el título en el pie de página, centrado y por encima de la línea
       doc.fontSize(10)
         .text(`Ticket de Venta`, {
           width: doc.page.width - 20,
           align: 'center',
           baseline: 'bottom',
           y: doc.page.height - 5 // Ajustar la posición del texto para que esté justo encima de la línea
         });
        }
      });

      doc.addPage();
      doc.fontSize(8);
      doc.font('Times-BoldItalic').text(`Cliente: ${venta.cliente?.nombre}`, {
        width: doc.page.width - 20,
        align: 'left'
      });
      // Mover hacia arriba para evitar salto de línea
      doc.moveUp();
      doc.font('Helvetica').fontSize(6).text('Fecha: ' + new Date().toLocaleDateString(), {
        width: doc.page.width - 20,
        align: 'right'
      });

      doc.font('Times-BoldItalic').fontSize(8).text(`Usuario: ${venta.user?.username}`, {
        width: doc.page.width - 20,
        align: 'left'
      });
      doc.moveDown(1);

      const table2 = {
        headers: [
          { label: "Nombre", property: 'nombre', headerColor: "#FFFFFF", headerOpacity: 1, align: "left", width: 60, renderer: null },
          { label: "Descripcion", property: 'descripcion', headerAlign: 'center', headerColor: "#FFFFFF", headerOpacity: 1, width: 50, renderer: null },
          { label: "Precio", property: 'precio_v', headerColor: "#FFFFFF", headerOpacity: 1, columnColor: '#FFFFFF', align: "center", width: 30, renderer: null },
          { label: "Cant.", property: 'cantidad', align: "center", headerColor: "#FFFFFF", headerOpacity: 1, width: 30, renderer: null },
          { label: "Subtotal", property: 'subtotal', headerAlign: 'center', headerColor: "#FFFFFF", headerOpacity: 1, align: "right", width: 37, renderer: (value: any) => { return `Bs ${Number(value).toFixed(2)}`; } },
        ],
        datas: lista
      };

      doc.table(table2, {
        prepareHeader: () => {
          doc.font("Helvetica-Bold").fontSize(6);
      
        },
        prepareRow: (row: any, indexColumn: any, indexRow: any, rectRow: any) => {
          doc.font("Helvetica").fontSize(6);
          doc.fillColor('#333'); // Cambiar color de texto de las filas
          indexColumn === 0 && doc.addBackground(rectRow, 'white', 0.15);
        },
      });

      // Usando reduce para sumar MontoTotal
      let totalMonto = lista.reduce((total: number, item: any) => {
        return total + parseFloat(item.MontoTotal);
      }, 0);

      doc.font("Helvetica-Bold").text(`Total: Bs. ${venta.monto!.toFixed(2)}`, {
        width: doc.page.width - 20,
        align: 'right'
      });

      // Finalización del documento
      const buffer: Uint8Array[] = []; // Declarar explícitamente el tipo
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });

      doc.end();
    });
      return pdfBuffer;
  }
  

}

const appService = new AppService();
export { appService };