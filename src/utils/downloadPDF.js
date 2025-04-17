import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (transactions) => {
  const doc = new jsPDF();

  const tableColumn = ["Type", "Description", "Amount", "Date"];
  const tableRows = [];

  let totalIncome = 0;
  let totalExpense = 0;

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

    const amount = Number(t.transactionAmount);

    if (t.transactionType === "income") {
      totalIncome += amount;
    } else {
      totalExpense += amount;
    }

    const rowData = [
      t.transactionType,
      t.description,
      amount.toFixed(2),
      formattedDate,
    ];
    tableRows.push(rowData);
  });

  const totalBalance = totalIncome - totalExpense;

  // Title
  doc.text("Transaction History", 14, 15);

  // Add summary
  doc.setFontSize(10);
  doc.text(`Total Income: Rs: ${totalIncome.toFixed(2)}`, 14, 22);
  doc.text(`Total Expense: Rs: ${totalExpense.toFixed(2)}`, 14, 28);
  doc.text(`Total Balance: Rs: ${totalBalance.toFixed(2)}`, 14, 34);

  // Render table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40, // start below the summary
  });

  doc.save(
    `transactions_${new Date().toLocaleDateString().replaceAll("/", "-")}.pdf`
  );
};
