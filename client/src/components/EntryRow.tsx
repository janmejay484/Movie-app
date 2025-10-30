import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EntryRowProps {
  entry: any;
  onEdit: (entry: any) => void;
  onDelete: (entry: any) => void;
}

export default function EntryRow({ entry, onEdit, onDelete }: EntryRowProps) {
  return (
    <TableRow hover>
      <TableCell>{entry.title}</TableCell>
      <TableCell>{entry.type}</TableCell>
      <TableCell>{entry.director}</TableCell>
      <TableCell>{entry.budget}</TableCell>
      <TableCell>{entry.location}</TableCell>
      <TableCell>{entry.duration}</TableCell>
      <TableCell>{entry.yearTime}</TableCell>
      <TableCell>
        <IconButton color="primary" onClick={() => onEdit(entry)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(entry)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
