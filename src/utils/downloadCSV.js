export const downloadCSV = (transactions) => {
  const headers = ["Type", "Description", "Amount", "Date"];

  let totalIncome = 0;
  let totalExpense = 0;

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

    const amount = Number(t.transactionAmount);

    if (t.transactionType === "income") {
      totalIncome += amount;
    } else {
      totalExpense += amount;
    }

    return [t.transactionType, t.description, amount.toFixed(2), formattedDate];
  });

  const totalBalance = totalIncome - totalExpense;

  // Add summary rows
  const summaryRows = [
    [],
    ["Total Income", "", totalIncome.toFixed(2), ""],
    ["Total Expense", "", totalExpense.toFixed(2), ""],
    ["Total Balance", "", totalBalance.toFixed(2), ""],
  ];

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
      ...summaryRows.map((r) => r.join(",")),
    ].join("\n");

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
