import React from "react";
import Pagination from "@material-ui/lab/Pagination";

interface Props {
    setPage: Function,
    numOfPages: number

}


export default function CustomPagination(props: Props) {
  const { setPage } = props
  const numOfPages = 10

  // Scroll to top when page changes
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      
        <Pagination
          onChange={handlePageChange}
          count={numOfPages}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      
    </div>
  );
}
