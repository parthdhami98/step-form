import React from "react";
import "./DataTable.css";

const DataTable = ({ entries, onEdit, onDelete }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="no-entries">
        No entries yet. Complete the form to add entries.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Display Name</th>
            <th>Workspace</th>
            <th>URL</th>
            <th>Usage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.fullName}</td>
              <td>{entry.displayName}</td>
              <td>{entry.workspaceName}</td>
              <td>
                {entry.workspaceUrl ? `google.com/${entry.workspaceUrl}` : "-"}
              </td>
              <td>
                {entry.usage === "myself" ? "For myself" : "With my team"}
              </td>
              <td className="actions">
                <button
                  className="edit-btn"
                  onClick={() => onEdit(index)}
                  aria-label="Edit entry"
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(index)}
                  aria-label="Delete entry"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
