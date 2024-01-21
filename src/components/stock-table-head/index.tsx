type StockTableHeadProps = {
  tableHead: React.MutableRefObject<HTMLTableSectionElement | null> | null;
};

const StockTableHead: React.FC<StockTableHeadProps> = ({ tableHead }) => {
  return (
    <thead ref={tableHead}>
      <tr>
        <th>Name</th>
        <th>Previous Close</th>
        <th>Last</th>
        <th>%</th>
        <th>+/-</th>
        <th>Trade Time</th>
      </tr>
    </thead>
  );
};

export default StockTableHead;
