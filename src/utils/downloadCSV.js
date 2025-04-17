export const downloadCSV = (transactions) => {
  const headers = ["Type", "Description", "Amount", "Date"];

  const rows = transactions.map((t) => {
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

    return [
      t.transactionType,
      t.description,
      t.transactionAmount,
      formattedDate,
    ];
  });

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `transactions_${new Date().toLocaleDateString().replaceAll("/", "-")}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
