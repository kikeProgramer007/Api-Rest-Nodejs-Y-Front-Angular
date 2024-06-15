import { join } from 'path';
const PDFDocument = require('pdfkit-table')
// var sf = require('pdfkit')
const fs = require("fs");
export class AppService {
    
    async generatePDF(lista:any):Promise<Buffer>{
        const pdfBuffer:Buffer = await new Promise(resolve =>{
            //Creacion del document
            const doc= new PDFDocument({
                size:"LETTER",
                bufferPages:true,
                autoFirstPage: false,//para que no cree automaticamente una pagina
            })

            //Aqui el contenido del pdf
            let pageNumber = 0;
            doc.on('pageAdded', () => {
              pageNumber++
              let bottom = doc.page.margins.bottom;
      
              if (pageNumber > 1) {
                doc.image(join(process.cwd(), "asset/img/logo1.png"), doc.page.width - 100, 5, { fit: [45, 45], align: 'center' })
                doc.moveTo(50, 55)
                  .lineTo(doc.page.width - 50, 55)
                  .stroke();
              }
      
              doc.page.margins.bottom = 0;
              doc.font("Helvetica").fontSize(14);
              doc.text(
                'Pág. ' + pageNumber,
                0.5 * (doc.page.width - 100),
                doc.page.height - 50,
                {
                  width: 100,
                  align: 'center',
                  lineBreak: false,
                })
              doc.page.margins.bottom = bottom;
            })
            doc.addPage()
            doc.image(join(process.cwd(), "asset/img/logo1.png"), doc.page.width / 2 - 100, 150, { width: 200, })
            doc.text('', 0, 400)
            doc.font("Helvetica-Bold").fontSize(24);
            doc.text("Comida Express Deysi", {
              width: doc.page.width,
              align: 'center'
            });
            doc.moveDown();
    
            doc.addPage();
            doc.text('', 50, 70)
            doc.fontSize(24);
            doc.moveDown();
            doc.font("Helvetica").fontSize(20);
            doc.text("Venta", {
              width: doc.page.width - 100,
              align: 'center'
            });
      
     
            doc.moveDown(1);

            const table2 = {
              headers: [
                { label:"Name", property: 'nombre', width: 60, renderer: null },
                { label:"descripcion", property: 'descripcion', width: 150, renderer: null }, 
                { label:"precio", property: 'precio_v', width: 100, renderer: null }, 
                { label:"cantidad", property: 'cantidad', width: 100, renderer: null }, 
                { label:"Subtotal", property: 'subtotal', width: 63, renderer: (value:any, indexColumn:any, indexRow:any, row:any) => { return `Bs ${Number(value).toFixed(2)}` } },
              ],
              datas: lista 
                // { 
                //   name: 'Name 1', 
                //   descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ', 
                //   precio: '$1', 
                //   cantidad: '$ 3', 
                //   monto: '$2', 
                // },
             
            };
            
            doc.table(table2, {
              prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
              prepareRow: (row:any, indexColumn:any, indexRow:any, rectRow:any) => {
              doc.font("Helvetica").fontSize(8);
              indexColumn === 0 ;
            },
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



}

const appService = new AppService();
export { appService };