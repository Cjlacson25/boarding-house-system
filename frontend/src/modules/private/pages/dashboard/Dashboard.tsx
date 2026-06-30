import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const boarders = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    room: "Room 1",
    bed: "Bed 2",
    paymentDue: "2026-07-02",
    paid: false,
    aircon: true,
    amenities: ["Iron Clothes"],
  },
  {
    id: 2,
    name: "Maria Santos",
    room: "Room 1",
    bed: "Bed 5",
    paymentDue: "2026-07-12",
    paid: true,
    aircon: false,
    amenities: ["Ricecooker"],
  },
  {
    id: 3,
    name: "Alex Mendoza",
    room: "Room 1",
    bed: "Bed 6",
    paymentDue: "2026-06-25",
    paid: false,
    aircon: false,
    amenities: [],
  },
  {
    id: 4,
    name: "Karen Reyes",
    room: "Room 2",
    bed: "Bed 1",
    paymentDue: "2026-07-05",
    paid: true,
    aircon: true,
    amenities: ["Iron Clothes", "Ricecooker"],
  },
  {
    id: 5,
    name: "Mark Villanueva",
    room: "Room 2",
    bed: "Bed 3",
    paymentDue: "2026-06-29",
    paid: false,
    aircon: false,
    amenities: ["Ricecooker"],
  },
];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getBoarderCharge = (boarder: (typeof boarders)[number]) => {
  const baseRate = boarder.aircon ? 5000 : 3000;
  const amenityCharges = boarder.amenities.reduce((sum, amenity) => {
    if (amenity === "Iron Clothes") return sum + 500;
    if (amenity === "Ricecooker") return sum + 300;
    return sum;
  }, 0);
  return baseRate + amenityCharges;
};

const today = new Date();

const Dashboard = () => {
  const pastDue = boarders.filter((boarder) => {
    const due = new Date(boarder.paymentDue);
    return !boarder.paid && due < today;
  });

  const roomSummary = [
    {
      name: "Room 1",
      beds: 6,
      occupied: boarders.filter((b) => b.room === "Room 1").length,
    },
    {
      name: "Room 2",
      beds: 4,
      occupied: boarders.filter((b) => b.room === "Room 2").length,
    },
  ];

  const totalBoarders = boarders.length;
  const totalBeds = roomSummary.reduce((sum, room) => sum + room.beds, 0);
  const occupiedBeds = boarders.length;

  return (
    <Box sx={{ minHeight: "100vh", p: 4, bgcolor: "background.default" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {roomSummary.map((room) => (
          <Grid item xs={12} md={6} key={room.name}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  {room.name}
                </Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {room.occupied} / {room.beds} beds occupied
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Boarders
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {totalBoarders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Total Beds
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {totalBeds}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Past Due Boarders
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mt: 1,
                  color: pastDue.length ? "error.main" : "success.main",
                }}
              >
                {pastDue.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {pastDue.length > 0 && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderLeft: 6,
            borderColor: "error.main",
            bgcolor: "rgba(244, 67, 54, 0.08)",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Notification
          </Typography>
          <Typography>
            {pastDue.length} boarder{pastDue.length > 1 ? "s are" : " is"} past
            due and has not paid yet.
          </Typography>
        </Paper>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h6">Boarders Summary</Typography>
        <Button variant="contained" color="primary">
          Add Boarder
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Bed</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amenities</TableCell>
              <TableCell>Monthly Charge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boarders.map((boarder) => {
              const amount = getBoarderCharge(boarder);
              const dueDate = new Date(boarder.paymentDue);
              const isPastDue = !boarder.paid && dueDate < today;

              return (
                <TableRow key={boarder.id} hover>
                  <TableCell>{boarder.name}</TableCell>
                  <TableCell>{boarder.room}</TableCell>
                  <TableCell>{boarder.bed}</TableCell>
                  <TableCell>{formatDate(boarder.paymentDue)}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        boarder.paid ? "Paid" : isPastDue ? "Past Due" : "Due"
                      }
                      color={
                        boarder.paid
                          ? "success"
                          : isPastDue
                            ? "error"
                            : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {boarder.amenities.length > 0 ? (
                      boarder.amenities.map((amenity) => (
                        <Chip
                          key={amenity}
                          label={amenity}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No extras
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>₱{amount.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
