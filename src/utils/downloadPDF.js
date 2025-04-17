import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (transactions) => {
  const doc = new jsPDF();

  const tableColumn = ["Type", "Description", "Amount", "Date"];
  const tableRows = [];

  transactions.forEach((t) => {
    const timestamp = t.createdAt?.seconds
      ? new Date(t.createdAt.seconds * 1000)
      : new Date();

    const formattedDate = `${String(timestamp.getDate()).padStart(
      2,
      "0"
    )}/${String(timestamp.getMonth() + 1).padStart(
      2,
      "0"
    )}/${timestamp.getFullYear()}`;

    const rowData = [
      t.transactionType,
      t.description,
      t.transactionAmount,
      formattedDate,
    ];
    tableRows.push(rowData);
  });

  doc.text("Transaction History", 14, 15);

  // ✅ Correct way to use autoTable
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save(
    `transactions_${new Date().toLocaleDateString().replaceAll("/", "-")}.pdf`
  );
};
