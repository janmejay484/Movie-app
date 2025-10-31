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
      <TableRow
        hover
        sx={{
          "& td": {
            wordBreak: "break-word",
            whiteSpace: { xs: "normal", sm: "nowrap" },
            fontSize: { xs: "0.8rem", sm: "1rem" },
          },
        }}
      >
        <TableCell>{entry.title}</TableCell>
        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{entry.type}</TableCell>
        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{entry.director}</TableCell>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{entry.budget}</TableCell>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{entry.location}</TableCell>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{entry.duration}</TableCell>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{entry.yearTime}</TableCell>
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
