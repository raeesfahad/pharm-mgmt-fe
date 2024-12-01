
export function invoiceGen(prescriptionData : any) : any {
    const {
        doctor_name,
        prescription_date,
        patient_name,
        drugs,
    } = prescriptionData;

    // Calculate total cost
    const totalCost = drugs.reduce((acc, drug) => acc + drug.price, 0);

    // Define pdfMake template
    const dd = {
        pageSize: 'A4',
        pageMargins: [50, 50, 50, 50],
        header: function (currentPage, pageCount) {
            return [
                {
                    text: `Prescription No: ${prescriptionData.id} - Page ${currentPage.toString()} of ${pageCount}`,
                    alignment: 'right',
                    fontSize: 10,
                },
            ];
        },
        content: [
            {
                text: 'PRESCRIPTION',
                fontSize: 20,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 20],
            },
            {
                columns: [
                    [
                        {
                            text: 'Doctor\'s Name:',
                            bold: true,
                        },
                        doctor_name,
                    ],
                    [
                        {
                            text: 'Date:',
                            bold: true,
                        },
                        prescription_date,
                    ],
                ],
            },
            {
                text: 'Patient\'s Name: ' + patient_name,
                margin: [0, 20, 0, 5],
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', '*', '*', '*'],
                    body: [
                        [
                            { text: 'Medicine', style: 'tableHeader' },
                            { text: 'Quantity', style: 'tableHeader' },
                            { text: 'Price', style: 'tableHeader' },
                            { text: 'Total', style: 'tableHeader' },
                        ],
                        ...drugs.map((drug) => [
                            drug.name,
                            drug.quantity,
                            `$${drug.price.toFixed(2)}`,
                            `$${drug.price.toFixed(2)}`,
                        ]),
                    ],
                },
                layout: 'headerLineOnly',
            },
            {
                columns: [
                    {
                        width: '*',
                        text: '',
                    },
                    {
                        width: '*',
                        table: {
                            widths: ['*', '*'],
                            body: [
                                ['Total Cost:', `$${totalCost.toFixed(2)}`],
                            ],
                        },
                        layout: 'noBorders',
                    },
                ],
            },
        ],
        styles: {
            tableHeader: {
                fontSize: 12,
                color: 'black',
            },
        },
    };

    return dd;
}