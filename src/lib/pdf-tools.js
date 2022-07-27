import PdfPrinter from "pdfmake"
// Define font files

export const getPDFReadableStream = productsArray => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
    },
  }

  const printer = new PdfPrinter(fonts)

  const tableContent = [
    ["TITLE", "CATEGORY"],
    ...productsArray.map(product => {
      return [product.name, product.description]
    }),
  ]

  console.log(tableContent)

  const docDefinition = {
    // content: booksArray.map(book => {
    //   return {
    //     text: `${book.title} - ${book.category}`,
    //     style: "header",
    //   }
    // }),
    content: [
      {
        style: "tableExample",
        table: {
          body: tableContent,
        },
      },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
    },
  }

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
  pdfReadableStream.end()

  return pdfReadableStream
}
