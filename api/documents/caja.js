module.exports = ( item,items) => {
    const today = new Date();
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Informe Compra</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 10px;
             line-height: 10px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             border: solid 1px #4d4d4d;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             font-size: 10px;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>            
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>                                                    
                            <td>
                               Fecha Compra: ${item.createdAt}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
              </table>              
              <table cellpadding="0" cellspacing="0">
                <tr>                   
                  <td class="tit">Monto Inicial:</td><td>${item.montoInicial} BOB</td>
                  <td class="cnt">Monto Ingreso:</td><td>${item.montoIngreso} BOB</td>
                </tr>                
                <tr>                   
                  <td class="tit">Monto Egreso:</td><td>${item.montoEgreso} BOB</td>
                  <td class="cnt">Monto Total:</td><td>${item.montoFinal} BOB</td>
                </tr>                
                <tr>                   
                  <td colspan="2" class="tit">Usuario:</td><td>${item.User.name}</td>                  
                </tr>                                
               
              </table>  
              <table cellpadding="0" cellspacing="0">
                <tr class="heading">
                   <td width="10%">N°</td>
                   <td width="20%">Tipo</td>                   
                   <td width="20%">Monto</td>                   
                   <td width="50%">Detalle</td>
                   
                </tr>
                ${ items.map((item)=>(
                  `<tr key=${item.id} class="item">
                   <td>${item.id}</td>
                   <td>${item.tipo}</td>                   
                   <td>${item.monto} BOB</td>                   
                   <td>${item.label}</td>
                   
                  </tr>`
                ))} 
             </table>          
          </div>          
       </body>
    </html>
    `;
};