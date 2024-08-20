import React from "react";

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, CircularProgress, Stack } from "@mui/material";

import { ShoppingCartIcon } from "@/assets";

function TableWrapper({
  tableStyle,
  containerStyle,
  spanTd,
  message,
  isLoading,
  isContent,
  children,
  thContent,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  page,
  rowsPerPage,
  perPage,
  total,
  showPagination,
  ...props
}) {
  return (
    // <TableContainer sx={{whiteSpace:'nowrap', ...containerStyle,"& .MuiTableCell-root":{
    //   textAlign:'center'
    // }}}>
    <TableContainer sx={{ whiteSpace: "nowrap", ...containerStyle, "& .MuiTableCell-root": {}, height: "400px", overflow: "auto" }}>
      <Table sx={[tableStyle]} {...props} stickyHeader>
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                textAlign: "center",
                fontWeight: "SemiBold",
                background: "#fff",
              },
            }}
          >
            {thContent?.map((each, index) => {
              return (
                <TableCell key={index} sx={{ borderBottom: "2px solid #C4C4C4", py: 0, background: "#fff" }}>
                  <Typography variant="body1" fontWeight="SemiBold">
                    {each}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={spanTd} align="center">
                <CircularProgress size={22} />
              </TableCell>
            </TableRow>
          ) : isContent ? (
            children
          ) : (
            <TableRow>
              <TableCell colSpan={spanTd} align="center">
                <Stack width="max-content" mx="auto" my={5} alignItems="center">
                  <ShoppingCartIcon sx={{ color: "#d4d4d4", fontSize: "200px" }} />
                  <Typography sx={{ color: "#d4d4d4" }}>Cart is Empty</Typography>
                </Stack>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {/* <TableFooter
        >
          {pagination}
          {showPagination && (
            <Stack>
              <UsePagination
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                perPage={perPage || 0}
                total={total || 0}
              />
            </Stack>
          )}
        </TableFooter> */}
      </Table>
      {/* <Stack sx={{ width: "100%" }}>
        {pagination}
        {showPagination && (
          <Stack alignSelf="center" pt={5}>
            <UsePagination
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              perPage={perPage || 0}
              total={total || 0}
            />
          </Stack>
        )}
      </Stack> */}
    </TableContainer>
  );
}
TableWrapper.defaultProps = {
  tableStyle: {},
  spanTd: "1",
  message: null,
  isContent: false,
  isLoading: false,
};
export default TableWrapper;
