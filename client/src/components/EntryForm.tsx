import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EntryFormProps {
  open: boolean;
  initial?: any;
  onClose: () => void;
  onSubmit: (data: any, id?: number) => void;
}

export default function EntryForm({ open, initial, onClose, onSubmit }: EntryFormProps) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initial || {} });

  useEffect(() => {
    reset(initial || {}); // Reset form when editing changes
  }, [initial, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data, initial?.id);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial ? "Edit Entry" : "Add New Entry"}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent className="flex flex-col gap-3 w-96">
          <TextField label="Title" {...register("title")} required />
          <TextField label="Type" {...register("type")} required />
          <TextField label="Director" {...register("director")} required />
          <TextField label="Budget" {...register("budget")} />
          <TextField label="Location" {...register("location")} />
          <TextField label="Duration" {...register("duration")} />
          <TextField label="Year/Time" {...register("yearTime")} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initial ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
