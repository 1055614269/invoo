/* eslint-disable */
require("script-loader!file-saver");
import XLSX from "xlsx-style";

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === "number") cell.t = "n";
      else if (typeof cell.v === "boolean") cell.t = "b";
      else if (cell.v instanceof Date) {
        cell.t = "n";
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = "s";
      cell.s = {
        alignment: {
          horizontal: "center",
          vertical: "center",
        }
      };
      ws[cell_ref] = cell;

    }
  }
  if (range.s.c < 10000000) ws["!ref"] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

export function export_json_to_excel({
  title,
  multiHeader = [],
  header,
  data,
  filename,
  merges = [],
  autoWidth = true,
  bookType = "xlsx"
} = {}) {
  // const merges = [`A1:${getCharCol(list.length - 2)}1`]; //合并单元格

  var wx = 2; //统一添加宽度
  filename = filename || "excel-list";
  data = [...data];

  data.unshift(header);
  if (title) {
    for (var i = title.length - 1; i >= 0; i--) {
      data.unshift(title[i]);
    }


  }
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  }
  var ws_name = "SheetJS";
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  if (merges.length > 0) {
    if (!ws["!merges"]) ws["!merges"] = [];
    merges.forEach(item => {
      ws["!merges"].push(XLSX.utils.decode_range(item));
    });
  }

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row =>
      row.map(val => {
        /*先判断是否为null/undefined*/
        if (val == null) {
          return {
            wch: 13
          };
        } else if (val.toString().charCodeAt(0) > 255) {
          /*再判断是否为中文*/
          return {
            wch: val.toString().length * 2 + wx
          };
        } else {
          return {
            wch: val.toString().length + wx
          };
        }
      })
    );
    // console.log(colWidth);
    /*以第一行为初始值*/
    let result = colWidth[title.length];
    colWidth[0][0]["wch"] = 13;
    // console.log(colWidth[0][0]["wch"]);
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]["wch"] < colWidth[i][j]["wch"]) {
          result[j]["wch"] = colWidth[i][j]["wch"];
        }
      }
    }
    ws["!cols"] = result;
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  var dataInfo = wb.Sheets[wb.SheetNames[0]];
  //设置主标题样式

  let style = {
    font: {
      name: "宋体",
      // sz: 14, //大小
      color: { rgb: "000000" },
      bold: true,

      // italic: false,
      // underline: false
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
      // hpt: 50
    }

    // fill: {
    //   fgColor: {rgb: "008000"},
    // },
  };
  let red = {
    font: {
      color: { rgb: "ff0000" },
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
    }
  }
  var range = header.length - 1;
  dataInfo["A1"].s = {
    font: {
      name: '宋体',
      sz: 14,
      // color: {rgb: "#FFFF0000"},
      bold: true,
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
      // hpt: 50
    }
  };
  dataInfo["A2"].s = {  //设置日期样式
    font: {
      name: '宋体',
      sz: 11,
      // color: {rgb: "#FFFF0000"},
      bold: false,
    }
  };
  dataInfo["B" + (title.length + 1)].s = style;
  dataInfo["A" + (title.length + 1)].s = style;
  dataInfo["C" + (title.length + 1)].s = style;
  dataInfo["D" + (title.length + 1)].s = style;
  dataInfo["E" + (title.length + 1)].s = style;
  dataInfo["F" + (title.length + 1)].s = style;
  dataInfo["G" + (title.length + 1)].s = style;
  dataInfo["H" + (title.length + 1)].s = style;
  dataInfo["I" + (title.length + 1)].s = style;
  dataInfo["J" + (title.length + 1)].s = style;
  dataInfo["K" + (title.length + 1)].s = style;
  dataInfo["!merges"] = [{
    s: {//s为开始
      c: 0,//开始列
      r: 0,//开始取值范围
    },
    e: {//e结束
      c: range,//结束列
      r: 0//结束范围
    }
  }, {//合并第一行数据[B2,C2,D2,E2]
    s: {//s为开始
      c: 0,//开始列
      r: 1,//开始取值范围
    },
    e: {//e结束
      c: range,//结束列
      r: 1//结束范围
    }
  }
  ];

  for (const key in dataInfo) {

    if (key.indexOf("B") != -1) {
      if (dataInfo[key].v > 500) {
        dataInfo[key].s = red;
      }

    }

  }


  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: "binary"
  });
  saveAs(
    new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    }),
    `${filename}.${bookType}`
  );
}