import React, { useEffect, useState } from "react";
import {
  Box,
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

export default function Sidebar() {
  const [cart, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const getTotalAmount = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  };

  const componentStyles = {
    sidebar: {
      width: "100%",
      "@media (min-width: 960px)": {
        marginTop: "0px",
        width: "auto",
      },
    },
  };

  return (
    <Grid item xs={12} sm={12} md={2} lg={4}>
      <Typography variant="h6" sx={{ p: 1, textAlign: "center" }} gutterBottom>
        Dashboard
      </Typography>

      <Box sx={componentStyles.sidebar}>
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "transparent" }}
          elevation={0}
        >
          <Table
            sx={{ minWidth: "auto" }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bolder" }}>Meals</TableCell>
                <TableCell sx={{ fontWeight: "bolder" }} align="center">
                  Id
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder" }} align="center">
                  Serving
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cart.map((row, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                </TableRow>
              ))}

              {/* Total amount row */}
              <TableRow>
                <TableCell colSpan={2} sx={{ fontWeight: "bolder" }}>
                  Total Amount:
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder" }} align="center">
                  RM {getTotalAmount()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  );
}
