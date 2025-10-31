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
  TableContainer,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
  Fab,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Dashboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [confirm, setConfirm] = useState<any>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchEntries(page);
  }, [page]);

  async function fetchEntries(pageNum: number, reset = false) {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    const res = await api.get(`/entries?page=${pageNum}&limit=5`);

    if (reset) {
      setEntries(res.data);
      setHasMore(true);
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

  async function refreshEntries() {
    setPage(1);
    await fetchEntries(1, true);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) setPage((p) => p + 1);
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  const handleSubmit = async (data: any, id?: number) => {
    const { id: _ignore, ...payload } = data;
    if (id) await api.put(`/entries/${id}`, payload);
    else await api.post("/entries", payload);
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

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #E0E7FF 0%, #F9FAFB 100%)",
          py: { xs: 3, sm: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight="bold"
            mb={isMobile ? 2 : 3}
            textAlign="center"
            color="primary"
          >
            🎬 My Favorite Movies & Shows
          </Typography>

          {/* ✅ Responsive view: Card layout on mobile, Table on desktop */}
          {!isMobile ? (
            <Paper
              elevation={5}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
            >
              <TableContainer>
                <Table size="medium">
                  <TableHead sx={{ backgroundColor: "primary.light" }}>
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
                        <TableCell
                          key={h}
                          sx={{
                            fontWeight: 600,
                            color: "#333",
                            fontSize: "1rem",
                            backgroundColor: "primary.light",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </TableCell>
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
              </TableContainer>

              {loading && (
                <Typography align="center" sx={{ py: 2, color: "text.secondary" }}>
                  Loading...
                </Typography>
              )}
            </Paper>
          ) : (
            // ✅ Mobile Card Layout
            <Box display="flex" flexDirection="column" gap={2}>
              {entries.map((entry) => (
                <Card
                  key={entry.id}
                  elevation={4}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600} color="primary">
                      {entry.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      🎥 {entry.type} • {entry.yearTime || "Unknown Year"}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">
                      <strong>Director:</strong> {entry.director || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Budget:</strong> {entry.budget || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Location:</strong> {entry.location || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Duration:</strong> {entry.duration || "N/A"}
                    </Typography>

                    {/* Actions */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1.5,
                        mt: 1,
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEditing(entry);
                          setFormOpen(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setConfirm(entry)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {loading && (
                <Box display="flex" justifyContent="center" py={2}>
                  <CircularProgress size={28} color="primary" />
                </Box>
              )}
            </Box>
          )}

          <Box ref={loaderRef} sx={{ height: 60 }} />
        </Container>

        {/* Floating Add Button */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            display: { xs: "flex", sm: "none" },
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

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
        title="Delete Entry?"
        message={`Are you sure you want to delete "${confirm?.title}"?`}
        onConfirm={() => {
          if (confirm) handleDelete(confirm.id);
          setConfirm(null);
        }}
        onCancel={() => setConfirm(null)}
      />
    </>
  );
}
