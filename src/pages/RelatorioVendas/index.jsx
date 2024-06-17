import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaFileExport } from "react-icons/fa";
import {
  LuArrowDownUp,
  LuArrowDownWideNarrow,
  LuArrowUpNarrowWide,
  LuFilter,
} from "react-icons/lu";
import ReactPaginate from "react-paginate";
import formatCurrencyBR from "../../hooks/formatCurrency.js";
import ExcelJS from "exceljs";
import styles from "./relatorioVendas.module.css";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { url_base2 } from "../../services/apis.js";

export default function RelatorioVendas() {
  const [showSaldo, setShowSaldo] = useState(false);
  const [vendas, setVendas] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [clickCount, setClickCount] = useState(0);
  const [dataPesquisa, setDataPesquisa] = useState("");
  const [produtoPesquisa, setProdutoPesquisa] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 8;
  const saldo = "1200.00";

  useEffect(() => {
    async function getRelatorioVendas() {
      await axios
        .get(url_base2 + "/relatorioVendas")
        .then((response) => {
          setVendas(response.data);
          setTableData(response.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    getRelatorioVendas();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "";
    }
    setSortConfig({ key, direction });

    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 2) {
      setSortConfig({ key: "", direction: "" });
      setClickCount(0);
      setTableData(vendas);
    } else {
      const sortedData = [...vendas].sort((a, b) => {
        let valueA = a[key];
        let valueB = b[key];

        if (key === "valor" || key === "comissao") {
          valueA = typeof valueA === "string" ? parseFloat(valueA) : valueA;
          valueB = typeof valueB === "string" ? parseFloat(valueB) : valueB;
        } else if (key === "dtVenda") {
          const [dayA, monthA, yearA] = valueA.split("/").map(Number);
          const [dayB, monthB, yearB] = valueB.split("/").map(Number);
          valueA = new Date(yearA, monthA - 1, dayA);
          valueB = new Date(yearB, monthB - 1, dayB);
        } else {
          valueA = valueA.toString().toLowerCase();
          valueB = valueB.toString().toLowerCase();
        }

        if (key === "valor" || key === "comissao") {
          return (valueA - valueB) * (direction === "asc" ? 1 : -1);
        } else if (key === "dtVenda") {
          return (valueA - valueB) * (direction === "asc" ? 1 : -1);
        } else {
          return (
            valueA.localeCompare(valueB, undefined, { sensitivity: "base" }) *
            (direction === "asc" ? 1 : -1)
          );
        }
      });
      setTableData(sortedData);
    }
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === "asc" ? (
        <LuArrowUpNarrowWide
          size={18}
          className="me-2"
          color="#818181"
          onClick={() => handleSort(columnName)}
        />
      ) : (
        <LuArrowDownWideNarrow
          size={18}
          className="me-2"
          color="#818181"
          onClick={() => handleSort(columnName)}
        />
      );
    }
    return (
      <LuArrowDownUp
        size={18}
        className="me-2"
        color="#818181"
        onClick={() => handleSort(columnName)}
      />
    );
  };

  const handleSearchData = (key, value) => {
    setDataPesquisa("");
    setProdutoPesquisa("");

    const [year, month, day] = value.split("-");
    const dataAjustada = new Date(year, month - 1, day);
    const dataFormatada = format(dataAjustada, "dd/MM/yyyy");

    const filteredData = vendas.filter((item) => {
      return item[key] === dataFormatada;
    });

    setTableData(filteredData);
    setCurrentPage(0);
  };

  const handleSearch = (key, value) => {
    setDataPesquisa("");
    setProdutoPesquisa("");

    const filteredData = vendas.filter((item) => {
      const columnValue = item[key].toString().toLowerCase();
      return columnValue.startsWith(value.toLowerCase());
    });
    setTableData(filteredData);
    setCurrentPage(0);
  };

  const resetFilters = () => {
    setDataPesquisa("");
    setProdutoPesquisa("");
    setSortConfig({ key: "", direction: "" });
    setClickCount(0);
    setTableData(vendas);
    setCurrentPage(0);
  };

  const offset = currentPage * pageSize;
  const currentItems = tableData.slice(offset, offset + pageSize);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Relatório de vendas");

    const headers = [
      "ID Venda",
      "Data da venda",
      "Descrição",
      "Valor",
      "Comissão",
    ];

    worksheet.addRow(headers);

    worksheet.columns = [
      { header: headers[0], key: "id", width: 10 },
      { header: headers[1], key: "dtVenda", width: 23 },
      { header: headers[2], key: "descricao", width: 40 },
      { header: headers[3], key: "valor", width: 13 },
      { header: headers[4], key: "comissao", width: 13 },
    ];

    vendas.forEach((item) => {
      worksheet.addRow(item);
    });

    const blob = await workbook.xlsx.writeBuffer();

    const excelBlob = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(excelBlob);
    link.download = "relatorio_vendas.xlsx";
    link.click();
  };

  return (
    <div className="container">
      <section className={styles.areaTop}>
        <Link to="/produtos-vendidos" className="btn btn-primary">
          Ir para meus produtos vendidos
        </Link>
        <p>
          {showSaldo ? formatCurrencyBR(saldo) : "Saldo a liberar"}{" "}
          {showSaldo ? (
            <FiEyeOff onClick={() => setShowSaldo(false)} />
          ) : (
            <FiEye onClick={() => setShowSaldo(true)} />
          )}
        </p>
      </section>
      <section className={`${styles.areaTabela}`}>
        <div>
        <section className="d-flex justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
            <p className="fw-normal m-0">Vendas</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-danger" onClick={resetFilters}>
              Limpar Filtros
            </button>
            <button
              className="btn btn-sm btn-primary d-flex gap-2"
              onClick={exportToExcel}
            >
              <FaFileExport size={20} />
              Exportar Excel
            </button>
          </div>
        </section>
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col" style={{ cursor: "pointer" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="col" onClick={() => handleSort("dtVenda")}>
                    Data
                  </span>
                  <div className="d-flex align-items-center">
                    {getSortIcon("dtVenda")}
                    <div className="dropdown drop-search border-end pe-2">
                      <LuFilter
                        size={19}
                        color="#818181"
                        className="me-2 dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-auto-close="true"
                      />
                      <div
                        className="dropdown-menu dropdown-menu-end mt-1 p-2 "
                        style={{
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                          border: "none",
                        }}
                      >
                        <input
                          type="date"
                          className="form-control mb-2"
                          name="input-search-dtVenda"
                          id="input-search-dtVenda"
                          value={dataPesquisa}
                          onChange={(e) => {
                            setDataPesquisa(e.target.value);
                          }}
                        />
                        <button
                          className="btn btn-sm col-12 btn-success"
                          onClick={() =>
                            handleSearchData("dtVenda", dataPesquisa)
                          }
                        >
                          <LuFilter size={19} color="#fff" className="me-1" />{" "}
                          Filtrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col" style={{ cursor: "pointer" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="col" onClick={() => handleSort("descricao")}>
                    Produto
                  </span>
                  <div className="d-flex align-items-center">
                    {getSortIcon("descricao")}
                    <div className="dropdown border-end pe-2 drop-search">
                      <MdOutlineSearch
                        size={22}
                        color="#818181"
                        className="me-2 dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-auto-close="true"
                      />
                      <div
                        className="dropdown-menu dropdown-menu-end mt-1 p-2"
                        style={{
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                          border: "none",
                        }}
                      >
                        <input
                          type="tel"
                          className="form-control mb-2"
                          id="input-search-descricao"
                          placeholder="Nome do produto"
                          value={produtoPesquisa}
                          onChange={(e) => setProdutoPesquisa(e.target.value)}
                        />
                        <button
                          className="btn btn-sm col-12 btn-success"
                          onClick={() =>
                            handleSearch("descricao", produtoPesquisa)
                          }
                        >
                          <MdOutlineSearch
                            size={22}
                            color="#fff"
                            className="me-1"
                          />{" "}
                          Buscar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="col" style={{ cursor: "pointer" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="col" onClick={() => handleSort("valor")}>
                    Valor
                  </span>
                  <div className="d-flex align-items-center border-end pe-1">
                    {getSortIcon("valor")}
                  </div>
                </div>
              </th>
              <th scope="col" style={{ cursor: "pointer" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="col" onClick={() => handleSort("comissao")}>
                    Comissão
                  </span>
                  <div className="d-flex align-items-center">
                    {getSortIcon("comissao")}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {currentItems.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.dtVenda}</td>
                  <td>{item.descricao}</td>
                  <td>{formatCurrencyBR(item.valor)}</td>
                  <td>{formatCurrencyBR(item.comissao)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {vendas.length > pageSize && (
          <ReactPaginate
            previousLabel={<span aria-hidden="true">&laquo;</span>}
            nextLabel={<span aria-hidden="true">&raquo;</span>}
            pageCount={Math.ceil(vendas.length / pageSize)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={0}
            onPageChange={handlePageClick}
            containerClassName={"pagination pagination-sm justify-content-end"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={`page-item`}
            previousLinkClassName={"page-link"}
            nextClassName={`page-item`}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            renderOnZeroPageCount={null}
          />
        )}
      </section>
    </div>
  );
}
