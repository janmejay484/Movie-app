import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import EntryForm from "../components/EntryForm";
import ConfirmDialog from "../components/ConfirmDialog";
import EntryRow from "../components/EntryRow";
import Navbar from "../components/Navbar";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Typography,
} from "@mui/material";

export default function Dashboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [confirm, setConfirm] = useState<any>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEntries(page);
  }, [page]);

// ✅ Updated fetchEntries with reset option
async function fetchEntries(pageNum: number, reset = false) {
  if (loading || (!hasMore && !reset)) return;

  setLoading(true);
  const res = await api.get(`/entries?page=${pageNum}&limit=5`);

  if (reset) {
    // full refresh after add/edit
    setEntries(res.data);
    setHasMore(true);
    // setPage(1);
  } else {
    if (res.data.length === 0) setHasMore(false);
    setEntries((prev) => {
      const ids = new Set(prev.map((e) => e.id));
      const newOnes = res.data.filter((e: any) => !ids.has(e.id));
      return [...prev, ...newOnes];
    });
  }

  setLoading(false);
}

// helper to trigger full refresh
async function refreshEntries() {
  setPage(1);           // reset page state first
  await fetchEntries(1, true);
}


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) setPage((p) => p + 1);
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

// ✅ Updated handleSubmit — refresh list correctly
const handleSubmit = async (data: any, id?: number) => {
  const { id: _ignore, ...payload } = data;

  if (id) {
    await api.put(`/entries/${id}`, payload);
  } else {
    await api.post("/entries", payload);
  }

  await refreshEntries();
  setFormOpen(false);
  setEditing(null);
};

  const handleDelete = async (id: number) => {
    await api.delete(`/entries/${id}`);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <>
      <Navbar onAdd={() => { setEditing(null); setFormOpen(true); }} />
      <Container sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          My Favorite Movies & Shows
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Title",
                "Type",
                "Director",
                "Budget",
                "Location",
                "Duration",
                "Year",
                "Actions",
              ].map((h) => (
                <TableCell key={h}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((e) => (
              <EntryRow
                key={e.id}
                entry={e}
                onEdit={(entry) => {
                  setEditing(entry);
                  setFormOpen(true);
                }}
                onDelete={(entry) => setConfirm(entry)}
              />
            ))}
          </TableBody>
        </Table>
        {loading && <Typography align="center">Loading...</Typography>}
        <div ref={loaderRef} style={{ height: 20 }} />
      </Container>

      <EntryForm
        {...({
          open: formOpen,
          initial: editing,
          onClose: () => setFormOpen(false),
          onSubmit: handleSubmit,
        } as any)}
      />

      <ConfirmDialog
        open={!!confirm}
        title="Delete?"
        message={`Delete "${confirm?.title}"?`}
        onConfirm={() => {
          if (confirm) handleDelete(confirm.id);
          setConfirm(null);
        }}
        onCancel={() => setConfirm(null)}
      />
    </>
  );
}
