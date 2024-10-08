import { Link } from "react-router-dom";
import classes from "./ExamTable.module.css";

interface TableProps {
  colHeadings: string[];
  rows: string[][];
  linkFirstColumn?: boolean;
}

function ExamTable({ colHeadings, rows, linkFirstColumn }: TableProps) {
  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr>
            {colHeadings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rid) => (
            <tr key={rid}>
              {row.map((cell, cid) => (
                <td key={cid}>{cid === 0 && linkFirstColumn ? <Link to={`/exams/${cell}`}>{cell}</Link> : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamTable;
