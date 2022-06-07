function getTableData(table) {
    const dataArray = [],
        nama = [],
        // alamat = [],
        // jurusan = [],
        nilai = [],
        grade = [];

    table.rows({ search: "applied" }).every(function () {
        const data = this.data();
        nama.push(data["nama"]);
        // alamat.push(data["alamat"]);
        // jurusan.push(data["jurusan"]);
        nilai.push(parseFloat(data["nilai_ipk"]));
        grade.push(data["grade"]);
    });

    dataArray.push(
        nama,
        // alamat,
        // jurusan,
        nilai,
        grade
    );
    return dataArray;
}

function chart(data) {
    Highcharts.chart("column-chart", {
        chart: {
            type: "column",
        },
        title: {
            text: "Nilai Per Orang",
        },
        xAxis: {
            categories: data[0],
            title: {
                text: null,
            },
        },
        yAxis: {
            title: {
                text: "Jumlah",
            },
            labels: {
                overflow: "justify",
            },
        },
        series: [
            {
                name: "Nilai",
                data: data[1],
            },
        ],
    });

    Highcharts.chart("bar-chart", {
        chart: {
            type: "bar",
        },
        title: {
            text: "berdasarkan grade nilai IPK",
        },
        xAxis: {
            categories: ["Memuaskan", "Sangat Memuaskan", "Cum Laude"],
            title: {
                text: null,
            },
        },
        yAxis: {
            title: {
                text: "Jumlah",
            },
            labels: {
                overflow: "justify",
            },
        },
        series: [
            {
                name: "Jumlah",
                data: [
                    data[1].filter((x) => x >= 2.0 && x <= 2.75).length,
                    data[1].filter((x) => x >= 2.76 && x <= 3.5).length,
                    data[1].filter((x) => x >= 3.51 && x <= 4.0).length,
                ],
            },
        ],
    });

    Highcharts.chart("pie-chart", {
        chart: {
            type: 'pie'
        },
        title: {
            text: "berdasarkan grade nilai IPK",
        },
        series: [
            {
                name: "Jumlah",
                colorByPoint: true,
                data: [
                    {
                        name: 'Memuaskan',
                        y: data[1].filter((x) => x >= 2.0 && x <= 2.75).length,
                    },
                    {
                        name: 'Sangat Memuaskan',
                        y: data[1].filter((x) => x >= 2.76 && x <= 3.5).length,
                    },
                    {
                        name: 'Cum Laude',
                        y: data[1].filter((x) => x >= 3.51 && x <= 4.0).length,
                    }
                ]
            }
        ]
    })
}

let draw = false;
function setTableEvents(table) {
    table.on("page", () => {
        draw = true;
    });

    table.on("draw", () => {
        if (draw) {
            draw = false;
        } else {
            const tableData = getTableData(table);
            chart(tableData);
        }
    });
}

$(document).ready(function () {
    const table_mahasiswa = $("#tbl-mahasiswa").DataTable({
        ajax: {
            url: "http://localhost/PT-TMA/mahasiswa.php?function=list_mahasiswa",
            dataSrc: "data",
        },
        columns: [
            { data: "nama" },
            { data: "alamat" },
            { data: "jurusan" },
            { data: "nilai_ipk" },
            { data: "grade" },
        ],
    });

    const dataTable = getTableData(table_mahasiswa);
    // console.log(dataTable)
    chart(dataTable);
    setTableEvents(table_mahasiswa);
});
