import React from "react";
import Pagination from "@material-ui/lab/Pagination";

interface Props {
    setPage: Function,
    numOfPages: number | undefined

}




export default function CustomPagination(props: Props) {
  const { setPage } = props
  const numOfPages = props.numOfPages

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
        padding: 0,
        margin: 0,
        marginTop: 10,
      }}
    >
      
        <Pagination
          onChange={handlePageChange}
          variant="outlined"
          count={numOfPages}
          hideNextButton
          hidePrevButton
          color="primary"
          style = {{backgroundColor: "lightblue", padding: 5}}
          
          

        />
      
    </div>
  );
}
